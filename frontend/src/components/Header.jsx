import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutDoctor, reset } from '../features/auth/authSlice'
import { useState } from 'react'

//MATERIAL UI
import Button from '@mui/material/Button'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Hidden from "@mui/material//Hidden";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { List } from '@mui/material'
import { ListItem } from '@mui/material'


function Header() {
  const [open, setOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);

    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'white',
        display: "flex",
        
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {doctor} = useSelector((state) => state.auth)

    const logoutDoc = () => { 
        dispatch(logoutDoctor())
        dispatch(reset())
        navigate('/')
    }
  return (
    
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="sticky" sx={{backgroundColor: 'black'}}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton> */}
        
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to='/' 
                  style={{
                    color: "white", 
                    borderRadius: 0,
                    height: 30,
                    border: "2px solid gray",
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent"
                  }}
                  onClick={() => {doctor ? setIsHome(true) : setIsHome(false)}}
                >
                  HMS
                </Link>
              </Typography>
            
            
            <Box sx={{display:{xs:"none", sm:"block"}}}>
              {doctor 
                  ?(
                    <>
                  <Button variant="contained" color="primary" onClick={logoutDoc}>
                      <FaSignOutAlt/> Logout
                  </Button>
                  {isHome &&
                  <Button variant="contained" color="primary" onClick={() => setIsHome(false)}>
                    <Link to='/select_appointment_date' style={{color:"white"}}>
                      <FaSignOutAlt/> Portal
                    </Link>
                  </Button>
                  }
                  </>
                  )
                  :(
                  <Box sx={{
                      width: 270,
                      display: 'flex',
                      justifyContent: 'space-around',
                  }}> 
                      <Link to='/login' style={linkStyle}>
                          <FaSignInAlt style={{marginRight: "5px"}}/>For Doctor
                      </Link> 
                      <Link to='/book_appointment' style={linkStyle}>
                          <FaUser style={{marginRight: "5px"}}/> For Patient
                      </Link>
                  </Box>)
                  }
            </Box>
            <Hidden smUp>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon style={{color:"white"}}/>
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <div
            onClick={() => setOpen(false)}
            role="button"
            tabIndex={0}
            style={{height: '100vh'}}
          >
            <Box sx={{
            p: 2,
            height: 1,
            backgroundColor: "grey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
            }}>
            <IconButton>
              <CloseIcon />
            </IconButton>
            <Divider/>
          <List>
            <ListItem >
              {doctor 
              ?(
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-around',
                alignItems: "center",
                }} >
                <Button variant="contained" color="primary" onClick={logoutDoc} sx={{marginBottom: '20px'}}>
                    <FaSignOutAlt/> Logout
                </Button>
                {isHome &&
                  <Button variant="contained" color="primary" onClick={() => setIsHome(false)}>
                    <Link to='/select_appointment_date' style={{color:"white"}}>
                      <FaSignOutAlt/> Portal
                    </Link>
                  </Button>
                }
              </Box>
                )
                :(
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                  }} >
                    <Link to='/login' style={linkStyle}>
                        <FaSignInAlt/>For Doctor
                    </Link> 
                    <Link to='/book_appointment' style={linkStyle}>
                        <FaUser /> For Patient
                    </Link>
                </Box>)
              }
            </ListItem>  
          </List>
          </Box>
          </div>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  )
}

export default Header