"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";

export default function Navbar() {
   const [auth, setAuth] = React.useState(localStorage.getItem("email") !== null);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   let email = localStorage.getItem("email");

   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   function handleLogout() {
      localStorage.removeItem("email");
      setAuth(false);
      window.location.href = "/";
   }

   React.useEffect(() => {
      setAuth(localStorage.getItem("email") !== null);
   }, []);

   return (
      <AppBar>
         <Toolbar color="default" sx={{ backgroundColor: "#212529", justifyContent: "space-between" }} variant="dense">
            <Link href="/" color="inherit" style={{ textDecoration: "none", color: "white" }}>
               MovIA
            </Link>

            {email && <Typography component="div">Bienvenue, {email}</Typography>}

            {auth && (
               <div>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleMenu}
                     color="inherit"
                  >
                     <AccountCircle />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorEl}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     <MenuItem component={Link} href="/films" onClick={handleClose}>
                        Films
                     </MenuItem>
                     <MenuItem component={Link} href="/user" onClick={handleClose}>
                        Profile
                     </MenuItem>
                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
               </div>
            )}
         </Toolbar>
      </AppBar>
   );
}
