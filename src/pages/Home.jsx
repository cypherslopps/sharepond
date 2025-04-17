import React, { useEffect, useState } from 'react'

import { FilesCategoryBox, FilesCategoryBoxLoader } from '../components/FilesCategoryBox'
import supabase from "../services/supabase";

const Home = () => {
    const [allImagesUrls, setAllImagesUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
          try {
            setIsLoading(true);
            const { data, error } = await supabase
              .storage
              .from('files')
              .list('', { limit: 100 });
      
            if (error) {
              return;
            }
      
            if (data) {
              const urls = data.map((file) =>
                supabase
                  .storage
                  .from('files')
                  .getPublicUrl(file.name).data.publicUrl
              );
              setAllImagesUrls(urls);
            }
          } catch(err) {
            // Handle Error
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchImages();
    }, []);

    if (!allImagesUrls) {
        return (
          <div>
            <h1>No File(s)</h1>
            <div>
              <p>Upload file</p>
            </div>
          </div>
        )
    }

    return (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 pb-6">
            {isLoading && !allImagesUrls.length ? Array.from({ length: 8 }).map((_, idx) => (
              <FilesCategoryBoxLoader 
                key={idx}
              />
            )) : !isLoading && allImagesUrls.map(url => (
                <FilesCategoryBox 
                    key={url}
                    url={url}
                />
            ))}
        </section>
    )
}

export default Home