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

export const FilesCategoryBox = ({ title, image_url }) => {
  return (
    <blockquote className="bg-box h-52 rounded-lg shadow-lg shadow-black/20 border-2 border-black p-2 relative hover:scale-[1.01] grid grid-rows-[1fr_max-content] gap-y-1.5">
      <figure>
        <img 
          src={image_url}
          className='size-full object-cover rounded-lg'
        />
      </figure>
      <p className="capitalize">{title}</p>
    </blockquote>
  )
}