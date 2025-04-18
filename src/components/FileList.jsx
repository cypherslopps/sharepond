import React, { useEffect, useState } from 'react'

import { FilesCategoryBox, FilesCategoryBoxLoader } from './FilesCategoryBox'
import EmptySlate from "./EmptySlate";
import useFetchSupabaseFiles from '../hooks/useFetchSupabaseFiles';

const FileList = () => {
    const { isLoading, files, fetchImages } = useFetchSupabaseFiles();

    useEffect(() => {
      fetchImages();

      const channel = supabase
      .channel('files')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'files' },
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
            fileName={file.name}
          />
        ))}
      </section>
    )
}

export default FileList