import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Demo from './RespAppBar'
import { useParams } from 'react-router-dom'

const AdminDeleteAcount = () => {
  const vamsi = useParams()
  useEffect(()=>{
    axios.delete(`http://localhost:4000/admin/deleteProfile/${vamsi.id}`,{

      headers:{
        'x-token':localStorage.getItem('krishna') 
      }

    })
  })
  return (
    <div>
      <Demo/>
      AdminDeleteAcount
    </div>
  )
}

export default AdminDeleteAcount

