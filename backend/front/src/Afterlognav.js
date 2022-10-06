import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";

export default function AButtonAppBar() {
  const nav = useNavigate();
  const handleClick2 = () =>{
    localStorage.removeItem('vamsi')
    let path = "/login ";
    nav(path);
    window.location.reload(true)
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
          <Button color="inherit" onClick={handleClick2}  >logout</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
