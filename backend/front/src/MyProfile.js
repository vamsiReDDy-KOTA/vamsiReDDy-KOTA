import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const [datas , setData] = useState([])
    useEffect(()=>{
        
        axios.get('http://localhost:4000/myProfile',{
            headers:{
                'x-token':localStorage.getItem('krishna')
            }
        }).then(res => setData(res.data.user))
    })
  return (
    <div>
        {datas.email}
        {datas.fullname}

        
    </div>
  )
}

export default MyProfile