import React from 'react'
import SkeletonLoader from 'tiny-skeleton-loader-react'

export const FilesCategoryBoxLoader = () => {
  return (
    <SkeletonLoader
      style={{
        height: "208px",
        borderRadius: "10px",
        background: "#0D1022",
        border: "1px solid black"
      }}
    />
  )
}

// const { data, error } = await supabase
//   .storage
//   .from('avatars')
//   .download('folder/avatar1.png')

export const FilesCategoryBox = ({ fileName }) => {
  return (
    <blockquote className="bg-box h-52 rounded-lg shadow-lg shadow-black/20 border-2 border-black p-2 relative hover:scale-[1.01]">
      <img 
        src={`${import.meta.env.VITE_SUPABASE_PROJECT_URL}/storage/v1/object/public/${import.meta.env.VITE_SUPABASE_PROJECT_BUCKET_NAME}/${fileName}`}
        className='size-full object-cover rounded-lg'
      />
    </blockquote>
  )
}