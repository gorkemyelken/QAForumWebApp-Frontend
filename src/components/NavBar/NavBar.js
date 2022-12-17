import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  let userId = 5;
  return (
    <div>
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
          <Typography variant="h6" component="div" >
            <Link className="homeLink" to="/">
              Home
            </Link>
          </Typography>
          <Typography variant="h6" component="div" >
          <Link className="userLink" to={{ pathname: "/users/" + userId }}>User</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
