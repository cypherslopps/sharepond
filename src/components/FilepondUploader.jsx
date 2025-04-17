import React, { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { nanoid } from "nanoid";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { toast } from 'react-toastify';

import supabase from "../services/supabase";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


const FilepondUploader = ({ label, setImage }) => {
    const [files, setFiles] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    const handleServer = async (
        fieldName, 
        file, 
        metadata, 
        load, 
        error, 
        progress, 
        abort, 
        transfer, 
        options
    ) => {
        if (file) {
            const filename = nanoid();
            const fileExt = file?.name.split(".").pop();
            const newFileName = `${filename}.${fileExt}`;
            
            try {
                progress(false, 0, file.size);
                
                const { data: supabaseResponseData, error: uploadError } = await supabase.storage
                .from("files")
                .upload(
                    newFileName,
                    file
                );

                if (uploadError) {
                    error(uploadError.message);

                    return {
                        abort: () => {
                            console.log("Aborting upload");
                            abort();
                        },
                    };
                } 

                // Report progress as complete
                progress(true, file.size, file.size);
                
                const { data: publicUrlData } = await supabase.storage
                    .from("files")
                    .getPublicUrl(supabaseResponseData?.path);

                progress(true, 1, 1);
                load(publicUrlData.publicUrl);

                toast("Image successfully uploaded");

                // Set image public url
                setImage(publicUrlData.publicUrl);
            } catch (err) {
                console.log(err?.message)
                return {
                    abort: () => {
                        abort(); // Abort FilePond upload
                    },
                };
            }
        }
    }

    if (!mounted) {
        return <div className="bg-[#18181b] h-24 rounded-md flex items-center justify-center">
            Loading
        </div>
    }

    return (
        <div
            role="group"
            className="flex flex-col gap-y-1.5"
        >
            <label className="text-sm text-white/60 font-medium select-none">{label}</label>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={5}
                server={{ process: handleServer }}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                className="filepond_wrap"
            />
        </div>
    )
}

export default FilepondUploader