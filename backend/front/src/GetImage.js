import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

//import { single } from 'rxjs';

const GetImage = () => {
    const vamsi = useParams()
    const [images,setImage] = useState([]);
    useEffect(()=>{
      axios.get(`http://localhost:4000/getImage/${vamsi.id}`,{
            
        headers:{
            'x-token' : localStorage.getItem('krishna'),
            'Content-Type':'application/json'
        }
    }).then(res => setImage((res.data.krishna)))
    .catch(err=> console.log(err))
    },[])

    //console.log(res.data)

    const imgs = images
    const imag = imgs
    console.log(imag)

    //console.log(imgs)

    //const base64str = btoa(
      //String.fromCharCode(...new Unit8Array((image.data.data)))
  //)
  const base64str = btoa(
    String.fromCharCode(...new Uint8Array(imag))
  );
  //const img = new Buffer.from(imag).toString("base64")
  //const base64String = btoa(String.fromCharCode(...new Uint8Array(imag)));
  //console.log(base64String)
  return (
    <>

        <img src= "{`../../uploads/${imgs}`}" alt="none"/>
       
    </>
  )
}

export default GetImage
