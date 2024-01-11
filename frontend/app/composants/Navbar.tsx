"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Link } from "@mui/material";

export default function Navbar() {
   // let email = localStorage.getItem("email");

   function handleLogout() {
      // localStorage.removeItem("email");
      window.location.href = "/";
   }

   return (
      <AppBar>
<<<<<<< Updated upstream
         <Toolbar color="default" sx={{ backgroundColor: "black", justifyContent: "space-between" }} variant="dense">
            <Typography variant="h6" component="div">
               MovIA
            </Typography>
            {/* {email && <Typography component="div">Bienvenue, {email}</Typography>}
=======
         <Toolbar color="default" sx={{ backgroundColor: "#212529", justifyContent: "space-between" }} variant="dense">
            <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
               MovIA{" "}
            </Link>

            {email && <Typography component="div">Bienvenue, {email}</Typography>}
>>>>>>> Stashed changes
            {email && (
               <Button color="inherit" onClick={handleLogout}>
                  Logout
               </Button>
            )} */}
         </Toolbar>
      </AppBar>
   );
}
