import React from 'react'
import FilepondUploader from '../components/FilepondUploader'

const UploadFile = () => {
  return (
    <main className="flex flex-col items-center">
        <div className="w-11/12 sm:w-10/12 md:w-1/2 space-y-12">
            <h1 className="text-lg sm:text-xl text-center font-bold">Upload File(s)</h1>
            <FilepondUploader
                label=""
                setImage={(source) => setForm({ ...form, image: source })}
            />
        </div>
    </main>
  )
}

export default UploadFile