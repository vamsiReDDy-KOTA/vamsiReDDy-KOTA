import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';

export default function ButtonAppBar() {
  const nav = useNavigate();
  const handleClick = () => {
    let path = "/login ";
    nav(path);
  };
  const handleClick1 = () => {
    let path = "/register";
    nav(path);
  };
  const handleClick2 = () =>{
    localStorage.removeItem('vamsi')
    let path = "/login ";
    nav(path);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form
          </Typography>
          {!localStorage.getItem('vamsi') && (
            <>                     
            <Button color="inherit" onClick={handleClick}  >Login</Button>
            
            <Button color="inherit" onClick={handleClick1}  >Signup</Button>
            </>
          )}
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
