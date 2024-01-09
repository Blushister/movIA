"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function Navbar() {
   let email = localStorage.getItem("email");

   function handleLogout() {
      localStorage.removeItem("email");
      window.location.reload();
   }


   return (
      <AppBar>
         <Toolbar color="default" sx={{ backgroundColor: "black", justifyContent: "space-between" }} variant="dense">
            <Typography variant="h6" component="div">
               MovIA
            </Typography>
            {email && <Typography component="div">Bienvenue, {email}</Typography>}
            {email && (
               <Button color="inherit" onClick={handleLogout}>
                  Logout
               </Button>
            )}
         </Toolbar>
      </AppBar>
   );
}
