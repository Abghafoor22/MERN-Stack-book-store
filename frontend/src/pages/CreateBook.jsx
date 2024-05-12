import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publishedyear, setPublishedyear] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const handleSaveBook = ()=>{
    const data ={
      title,
      author,
      publishedyear
    }
    setLoading(true)
   axios.post("http://localhost:5555/books", data).then(()=>{
    setLoading(false)
    navigate("/")
   }).catch((error)=>{
    setLoading(false)
    alert("Error")
    console.log(error);
   })

  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner/> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
          type="text"
          name="title"
          id="title"
          className='border-2 border-gray-200 px-4 py-2 w-full'
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}

          />
          <label htmlFor="author" className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
          type="text"
          name="author"
          id="author"
          className='border-2 border-gray-200 px-4 py-2 w-full'
          value={author}
          onChange={(e)=>{setAuthor(e.target.value)}}

          />
          <label htmlFor="published" className='text-xl mr-4 text-gray-500'>Published Year</label>
          <input 
          type="text"
          name="published"
          id="published"
          className='border-2 border-gray-200 px-4 py-2 w-full'
          value={publishedyear}
          onChange={(e)=>{setPublishedyear(e.target.value)}}

          />
        </div>
        <button className='p-2 bg-sky-500 m-8' onClick={handleSaveBook}>Save</button>
      </div>
       
    </div>
  )
}

export default CreateBook
