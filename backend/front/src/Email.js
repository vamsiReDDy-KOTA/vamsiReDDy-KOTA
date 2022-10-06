import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper,  Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';

const Email = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters")
          .max(40, "Password must not exceed 40 characters"),
        //rememberMe: Yup.bool().oneOf([true]),
      });

    const nav = useNavigate();
    const handleClick = () => {
        let path = "/forgetPassword";
        nav(path);
        
      };
    const [data,setData] = useState({
      email:''
    }) 

    const SubmitHandler = async(e) => {
        e.preventDefault();
        try {
          axios
            .post("http://localhost:4000/forgetpass", data)
            .then((res) =>
              console.log(res.data)
            )
              .catch((error) => {
              if (error.response) {
                alert(error.response);
              }
            });
        } catch (error) {
          console.log(error);
        }
        let vl = "/forgetPassword"
        nav(vl)
        }

    const PaperStyle = {
        padding: "20px 20px",
        width: 300,
        margin: "0 auto",
      };
      const headerStyle = {
        margin: 0,
      };

      const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
      });

  return (
    <div>
        <form onSubmit={SubmitHandler} >
      <Paper style={PaperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Forget Password</h2>
        </Grid>
        <Grid container spacing={1}>
          <TextField
            required
            id="email"
            name="email"
            variant="standard"
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            onChange={(e)=>{ setData({...data,email:e.target.value})}}
            
           />
          
          <br />
          
        </Grid>

        
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            
          >
            Submit
          </Button>
        
      </Paper>
      </form>
    </div>
  )
}

export default Email