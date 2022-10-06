import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper,  Box } from "@mui/material";

const ForgetPassword = () => {
    const [data,setData] = useState({
        
        password:'',
        confirmPassword:''
    }) 
    
    const PaperStyle = {
        padding: "20px 20px",
        width: 300,
        margin: "0 auto",
      };
      const headerStyle = {
        margin: 0,
      };
      const changeHandler = e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <form  >
      <Paper style={PaperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Update Acount</h2>
        </Grid>
        <Grid container spacing={1}>
          <TextField
            required
            id="password"
            name="password"
            variant="standard"
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            onChange={changeHandler}
           />
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="standard"
            type="password"
            fullWidth
            margin="dense"
            onChange={changeHandler}
            />
          
          <br />
          
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

export default ForgetPassword