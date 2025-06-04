import React from 'react'
import Skeleton from 'react-skeleton-loader';
import { toast } from 'react-toastify'

import supabase from "../services/supabase";

export const FilesCategoryBoxLoader = () => {
  // <Skeleton />
  return (
    <div></div>
  )
}

export const FilesCategoryBox = ({ title, image_url }) => {
  
  const downloadImage = async () => {
    try {
      const imageExt = image_url.substring(image_url.lastIndexOf('/') + 1);
      const { data, error } = await supabase
        .storage
        .from(import.meta.env.VITE_SUPABASE_PROJECT_STORAGE_BUCKET_NAME)
        .download(imageExt)
      
      if (error) {
        return;    
      } 

      // Create a URL for the file blob
      const url = window.URL.createObjectURL(data);

      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = imageExt;

      // Remove link tag and revoke window object URL
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err.message)
      toast.error("An error occured while downloading");
    }
  }

  return (
    <blockquote className="bg-box h-52 rounded-lg shadow-lg shadow-black/20 border-2 border-black p-2.5 relative hover:scale-[1.01] grid grid-rows-[85%_max-content] gap-y-1.5">
      <figure>
        <img 
          src={image_url}
          className='size-full object-cover rounded-lg'
        />
      </figure>

      <div className='flex items-center justify-between'>
        <p className="capitalize text-white/90">{title}</p>

        <span 
          onClick={downloadImage}
          className="cursor-pointer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-download-icon lucide-download"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" x2="12" y1="15" y2="3"/>
          </svg>
        </span>
      </div>
    </blockquote>
  )
}