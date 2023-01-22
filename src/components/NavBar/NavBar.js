import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./NavBar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LockIcon from '@mui/icons-material/Lock';

function Navbar() {
  const onClick = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    Navigate(0);
  }
  return (
    <AppBar position="static" className="appbar">
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
          <Link className="link" to={{ pathname: "/"  }}>
            Home
          </Link>
        </Typography>
        <Typography variant="h6" component="div" >
        {localStorage.getItem("currentUser") == null ? <Link  className="link" to="/auth">Login/Register</Link>:
             <div><IconButton className="link" onClick = {onClick}><LockIcon/></IconButton>
            <Link  className="link" to={{pathname : '/users/' + localStorage.getItem("currentUser")}}>Profile</Link>
            </div>}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
