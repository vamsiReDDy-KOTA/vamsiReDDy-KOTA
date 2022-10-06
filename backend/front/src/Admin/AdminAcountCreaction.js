import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios'
import Demo from './RespAppBar'


const AdminAcountCreaction = () => {
  
    //const nav = useNavigate();
  const PaperStyle = {
    padding: "20px 20px",
    width: 300,
    margin: "0 auto",
  };
  const headerStyle = {
    margin: 0,
  };
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });
  const onSubmit = (data) => {
    
    try{
    axios.post('http://localhost:4000/admin/createAcounts',data,{
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
    <>
    <Demo/>
    <Grid className="box">
      <Paper style={PaperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Create Acount</h2>
        </Grid>
        <Grid container spacing={1}>
          <TextField
            required
            id="fullname"
            name="fullname"
            variant="standard"
            label="Full Name"
            fullWidth
            margin="dense"
            {...register("fullname")}
            error={errors.fullname ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.fullname?.message}
          </Typography>

          <TextField
            required
            id="username"
            name="username"
            label="Username"
            variant="standard"
            fullWidth
            margin="dense"
            {...register("username")}
            error={errors.username ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.username?.message}
          </Typography>

          <TextField
            required
            id="email"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            margin="dense"
            {...register("email")}
            error={errors.email ? true : false}
          />
          <br />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>

          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="dense"
            {...register("password")}
            error={errors.password ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>

          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="standard"
            type="password"
            fullWidth
            margin="dense"
            {...register("confirmPassword")}
            error={errors.confirmPassword ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.confirmPassword?.message}
          </Typography>
        </Grid>
        
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Sign up
          </Button>
        </Box>
      </Paper>
    </Grid>
    </>
  )
}

export default AdminAcountCreaction
