import React from 'react'
import { ToastContainer } from 'react-toastify';
import FileUploaderForm from "./components/FileUploaderForm";
import FileList from "./components/FileList";

const App = () => {
  return (
    <>
      <ToastContainer />
      
      <main className='flex flex-col items-center py-20'>  
        <h1 className='text-center mb-10 text-xl font-bold'>Upload File(s)</h1>
        <FileUploaderForm />
        <FileList />
      </main>
    </>
  )
}

export default App