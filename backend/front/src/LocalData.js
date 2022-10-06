import React from 'react'

const LocalData = () => {
  return (
   
    <div>
        var data = localStorage.getItem('vamsi')
        var datas = JSON.parse(data)
        console.log(datas.id) 
    </div>
  )
}

export default LocalData