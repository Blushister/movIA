"use client";
import { AppBar, Button, Link, Toolbar, Typography } from "@/node_modules/@mui/material/index";

export default function Navbar() {
   let email = localStorage.getItem("email");

   function handleLogout() {
      localStorage.removeItem("email");
      window.location.href = "/";
   }

   return (
      <AppBar>
         <Toolbar color="default" sx={{ backgroundColor: "#212529", justifyContent: "space-between" }} variant="dense">
            <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
               MovIA
            </Link>

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
