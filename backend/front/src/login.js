import React, { useContext, useEffect, useState } from "react";
import "./app.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Demo from './Admin/AdminNavBar'
import App from './App'
import Nav from './Nav'
import {
  Grid,
  Paper,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";



const Login = () => {
  const handleClick2 = () => {
    let path = "/email";
    nav(path);
    
  };
  //const [admin,setAdmin] = useState(false)
  //const [auth, setAuth] = useState(false);
  const nav = useNavigate();
  // const [data,setData] = useState(null)
  const PaperStyle = {
    padding: "22px 20px",
    width: 300,
    margin: "0 auto",
    marginTop: 22,
  };
  const headerStyle = {
    margin: 0,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    //rememberMe: Yup.bool().oneOf([true]),
  });

  
  const [isChecked, setIsChecked] = React.useState(true);

  const clickHandler = () => {
    setIsChecked(!isChecked);
    
  };

  const onSubmit = async(data) => {
    try {
      axios
        .post("http://localhost:4000/login", data)
        .then((res) =>
          isChecked ? localStorage.setItem("vamsi", (JSON.stringify(res.data))) & localStorage.setItem('krishna',(JSON.stringify(res.data.token).split('"'))) : null,
        )
          .catch((error) => {
          if (error.response) {
            alert(error.response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
    let vl = "/desktop"
    nav(vl)
    }
    
    
    //let en = "/login"
    //let vl = "/desktop";
    //var data = localStorage.getItem('vamsi')
    //var datas = JSON.parse(data)
    //var tok = datas.token
    //{
    //  tok?
    //    nav(vl):nav(en)
    //}
    
    //var data = localStorage.getItem('vamsi')
    //var datas = JSON.parse(data)
    //setAdmin(datas.token)
    //console.log(admin)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClick = () => {
    let path = "/login ";
    nav(path);
    window.location.reload(true)
  };
  const handleClick1 = () => {
    let path = "/register";
    nav(path);
    window.location.reload(true)
  };
  

  return (
    <>
    <Nav />
    
    <Grid>
      
      <Paper style={PaperStyle}>
        <Stack direction="row" spacing={22}>
          <Chip label="Login" onClick={handleClick} variant="outlined" />
          <Chip label="Signup" variant="outlined" onClick={handleClick1} />
        </Stack>
        <Grid align="center">
          <h2 style={headerStyle}>Login</h2>
        </Grid>
        <Grid container spacing={1}>
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
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "60%" }}>
            <div>
              <Button
                
                style={{
                  textTransform: "initial",
                  marginTop: "16px",
                  color: "blue",
                }}
                onClick={handleClick2}
              >
                Forgot Password?
              </Button>
            </div>

            <div>
              not a mumber?
              <button
                style={{
                  textTransform: "text",
                  marginTop: "16px",
                  color: "blue",
                }}
              >
                <Link to="/register">Signup</Link>
              </button>
            </div>
          </div>
        </div>
        {/* checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox onClick={clickHandler} defaultChecked={true} />
            }
            label={<Typography>Remember me</Typography>}
          />
        </Grid>
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Grid>
    </>
  );
};

export default Login;
