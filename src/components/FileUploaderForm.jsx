import React, { useCallback, useState } from 'react'
import FilepondUploader from './FilepondUploader'
import supabase from '../services/supabase';
import { toast } from 'react-toastify';

const FileUploaderForm = () => {
    const [data, setData] = useState({
        title: "",
        image: ""
    });
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isValid = data.title.trim() !== '' && data.image !== '';

    const uploadData = useCallback(async (e) => {
        e.preventDefault();
        if (!isValid) return;

        setIsLoading(true);

        try {
            const { error } = await supabase
                .from("files")
                .insert([
                    {
                        title: data.title,
                        image_url: data.image
                    }
                ]);
                
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Successfully added data");
                setData({
                    title: "",
                    image: ""
                });
                setFiles([]);
            }

        } catch (err) {
            console.log(err.message);
            toast.error("An error occured");
        } finally {
            setIsLoading(false);
        }
    }, [data, isValid])

    const updateImages = (image) => {
        setData({
            ...data,
            image
        });
    }

    return (
        <form
            onSubmit={uploadData}
            className='space-y-2.5 w-1/2'
        >
            <div
                role="group"
                className='flex flex-col gap-y-1'
            >
                <label className="text-sm text-white/60 font-medium select-none">File Name</label>
                <input 
                    type="text"
                    name="title"
                    onChange={e => setData({ ...data, title: e.target.value })}
                    value={data.title}
                    className="w-full bg-box h-12 p-2.5 rounded-lg border border-black placeholder:text-sm outline-none hover:border-primary/60"
                />
            </div>

            <FilepondUploader 
                label="Filepond"
                setImages={updateImages}
                files={files}
                setFiles={setFiles}
            />
            
            <button
                type="submit"
                disabled={isLoading || !isValid}
                className="btn w-full disabled:pointer-events-none disabled:opacity-60 flex items-center justify-center gap-x-2"
            >  
                {isLoading && (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                )}
                Upload
            </button>
        </form>
    )
}

export default FileUploaderForm