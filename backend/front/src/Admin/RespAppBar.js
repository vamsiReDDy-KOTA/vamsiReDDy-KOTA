import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

//const pages = ['Products', 'Pricing', 'Blog'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

    const nav = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [datas , setData] = React.useState([])
  React.useEffect(()=>{
      
      axios.get('http://localhost:4000/myProfile',{
          headers:{
              'x-token':localStorage.getItem('krishna')
          }
      }).then(res => setData(res.data.user))
  })

  const handleClickNav = () => {
    let path = "/AdminCreation ";
    nav(path);
  }
  const handleClickNav2 = () => {
    let path = "/AdminSeeAcounts ";
    nav(path);
  }
  const handleClickNav3 = () => {
    let path = "/AdminUpdateAcount ";
    nav(path);
  }
  const handleClickNav4= () => {
    let path = "/AdminDeleteAcount";
    nav(path);
  }
  const clickHandler2 = () =>{
    localStorage.removeItem('vamsi')
    localStorage.removeItem('krishna')
  }
  const clickHandler3 = () =>{
    let path = "/settings"
    nav(path)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const clickHandler = () =>{
    let path = '/myProfile/'
    nav(path)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >              
                <MenuItem key='CreateAcount' onClick={()=>{handleClickNav();handleCloseNavMenu()}}>
                  <Typography textAlign="center">CreateAcount</Typography>
                </MenuItem>
                <MenuItem key='See All Acounts' onClick={()=>{handleClickNav2();handleCloseNavMenu()}}>
                  <Typography textAlign="center">See All Acounts</Typography>
                </MenuItem>
                <MenuItem key='Update Acount' onClick={()=>{ handleClickNav3() ;handleCloseNavMenu()}}>
                  <Typography textAlign="center">Update Acount</Typography>
                </MenuItem>
                <MenuItem key='Delete Acount' onClick={()=>{handleClickNav4();handleCloseNavMenu()}}>
                  <Typography textAlign="center">Delete Acount</Typography>
                </MenuItem>

            </Menu>
             
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            <Button
                key='CreateAcount'
                onClick={()=>{handleClickNav();handleCloseNavMenu()}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                CreateAcount
              </Button>
              <Button
                key='See All Acounts'
                onClick={()=>{handleClickNav2();handleCloseNavMenu()}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                See All Acounts
              </Button>
              <Button
                key='Update Acount'
                onClick={()=>{handleClickNav3();handleCloseNavMenu()}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Update Acount
              </Button>
              <Button
                key='Delete Acount'
                onClick={()=>{handleClickNav4();handleCloseNavMenu()}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Delete Acount
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={datas.fullname} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/*settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))*/}
              <MenuItem key="MyAcount" onClick={()=>{clickHandler();handleCloseUserMenu()}}>
                  <Typography textAlign="center">MyAcount</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={()=>{clickHandler2();handleCloseUserMenu()}}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                <MenuItem key="Settings" onClick={()=>{clickHandler3();handleCloseUserMenu()}}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;