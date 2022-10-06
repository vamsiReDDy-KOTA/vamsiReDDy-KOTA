import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const UploadProfile = () => {
    const vamsi = useParams()
    const [data , setData] = useState({
        image:""
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',data.image)
        console.log(data.image);
        axios.put(`http://localhost:4000/addImage/${vamsi.id}`,formData,{
            headers:{
                'x-token' : localStorage.getItem('krishna')
            } 
        })
        .then(res => {
            console.log(res)
            setData({  })  
        })
        .catch(err => {
            console.log(err)
        })
    
        
    }
    

  return (
    <div>
        hello
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
            type="file"
            accept=' .png, .jpg, .jpeg '
            name='image'
            onChange={(e)=>setData({
                ...data,image:e.target.files[0]
            })}
        />

        <input 
        type='submit'
        />

        </form>
        
    </div>
  )
}

export default UploadProfile
