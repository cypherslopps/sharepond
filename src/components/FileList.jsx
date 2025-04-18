import React, { useEffect, useCallback, useState } from 'react'

import supabase from "../services/supabase";

import { FilesCategoryBox, FilesCategoryBoxLoader } from './FilesCategoryBox'
import EmptySlate from "./EmptySlate";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('files').select('*');
      console.log(data);  

      if (error) {
        return;
      }

      if (data) {
        setFiles(data);
      }
    } catch(err) {
      // Handle Error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();

    const channel = supabase
    .channel('public:files')
    .on(
      'postgres_changes',
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'files' 
      },
      (payload) => {
        setFiles((prev) => [...prev, payload.new]);
      }
    )
    .subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, []);

  if (!files.length && !isLoading) {
    return (
      <EmptySlate />
    )
  }

  return (
    <section className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 pb-6">
      {isLoading && !files.length ? Array.from({ length: 8 }).map((_, idx) => (
        <FilesCategoryBoxLoader 
          key={idx}
        />
      )) : !isLoading && files.map(file => (
        <FilesCategoryBox 
          key={file.id}
          {...file}
        />
      ))}
    </section>
  )
}

export default FileList