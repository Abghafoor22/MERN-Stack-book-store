import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const handleDeleteBook =()=>{
    setLoading(true)
    axios.delete(`http://localhost:5555/books/${id}`).then(()=>{
      setLoading(false)
      navigate("/")
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    
      <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner/> : ""}
      <div className="flex flex-col items-center border-2 border-sky-300 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className='text-2xl'>Are you sure to <b>Delete</b> Book </h3>
        <button className='bg-red-700 p-4 m-8 w-full text-white' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
      </div>

   
  )
}

export default DeleteBook
