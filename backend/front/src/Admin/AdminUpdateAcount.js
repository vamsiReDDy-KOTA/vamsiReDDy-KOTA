import React, { useState } from 'react'
import Demo from './RespAppBar'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import * as Yup from "yup";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useParams } from 'react-router-dom';

const AdminUpdateAcount = ({match}) => {
  

  const [data,setData] = useState({
    fullname:'',
    username:'',
    email:'',
    password:'',
}) 
const changeHandler = e=>{
    setData({...data,[e.target.name]:e.target.value})
}
const vamsi = useParams()
const submitHandler = e=>{
    
    e.preventDefault();
    try{
      axios.put(`http://localhost:4000/admin/updateUser/${vamsi.id}`,data,{
        headers:{
          'x-token' : localStorage.getItem('krishna')
      }
      }).then(
              res => alert(res.data)
          ).catch((error) => {
              if (error.response) {
                alert(error.response.data);
              }
            })
      }
      catch(error){
          console.log(error)
      } 

}
  const PaperStyle = {
    padding: "20px 20px",
    width: 300,
    margin: "0 auto",
  };
  const headerStyle = {
    margin: 0,
  }; 
  

  return (
    <div>
      <Demo/>
      <form onSubmit={submitHandler} >
      <Paper style={PaperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Update Acount</h2>
        </Grid>
        <Grid container spacing={1}>
          <TextField
            
            id="fullname"
            name="fullname"
            variant="standard"
            label="Full Name"
            fullWidth
            margin="dense"
            onChange={changeHandler}
           
            
          />
          

          <TextField
            
            id="username"
            name="username"
            label="Username"
            variant="standard"
            fullWidth
            margin="dense"
            onChange={changeHandler}
           
            />
          
          <br />
          <TextField
      
            id="isAdmin"
            name="isAdmin"
            label="Password"
            type="text"
            variant="standard"
            fullWidth
            margin="dense"
            onChange={changeHandler}

          
          />
          
        </Grid>

        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Paper>
      </form>
    </div>
  )
}

export default AdminUpdateAcount