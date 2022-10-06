import React, { useState } from "react";
import "./app.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Grid, Paper, Typography, Box, FilledInput, Fab } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios';

//import image from './img/animals-0b6addc448f4ace0792ba4023cf06ede8efa67b15e748796ef7765ddeb45a6fb.jpg';

const Regster = () => {
  const [newUser, setNewUser] = useState(
    {
      image:""
    }
);
  const nav = useNavigate();
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
    let path = "/login";
    const formData = new FormData();
    formData.append('image',newUser.image)
    axios.post('http://localhost:4000/register',formData,data).then(
            
            res => res?nav(path):null
        )
    
   //nav(path);

  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  const handleClick = () => {
    let path = "/login";
    nav(path);
  };
  const handleClick1 = () => {
    let path = "/register";
    nav(path);
  };
  const handleClick2 = () =>{
    let path = "/addProfile"
    nav(path)
  }

  return (
    <Grid className="box">
      <Paper style={PaperStyle}>
        
        <Stack direction="row" spacing={22}>
          <Chip label="Login" onClick={handleClick} variant="outlined" />
          <Chip label="Signup" variant="outlined" onClick={handleClick1} />
        </Stack>
        <Grid align="center">
          <h2 style={headerStyle}>Sign up</h2>
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

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="acceptTerms"
                  defaultValue="false"
                  inputRef={register()}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      color="primary"
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label={
                <Typography color={errors.acceptTerms ? "error" : "inherit"}>
                  I have read and agree to the Terms *
                </Typography>
              }
            />
            <br />
            <Typography variant="inherit" color="textSecondary">
              {errors.acceptTerms ? "(" + errors.acceptTerms.message + ")" : ""}
            </Typography>
          </Grid>
        </Grid>
        
        <input
            type="file"
            accept=' .png, .jpg, .jpeg '
            name='image'
            onChange={(e)=>setNewUser({
                ...newUser,image:e.target.files[0]
            })}
        />

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
  );
};

export default Regster;
