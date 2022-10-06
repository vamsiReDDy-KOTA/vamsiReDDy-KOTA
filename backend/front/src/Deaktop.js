import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Bar from './Afterlognav'

const Deaktop = () => {
  const nav = useNavigate()
  useEffect(async()=>{
    let vl = "/desktop"
    let v = "/Admin"
    
    var data = localStorage.getItem('vamsi')
    var datas = JSON.parse(data)
    var ls = await datas.isAdmin
    if(ls){
      nav(v)
    }
    window.location.reload(true)
  })
  return (
  
    <div>
      <Bar/>
      Deaktop
      </div>
  )
}

export default Deaktop