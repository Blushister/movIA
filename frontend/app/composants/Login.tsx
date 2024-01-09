"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";

export default function LoginForm() {
   const [showRegister, setShowRegister] = React.useState(false);
   const [nom, setNom] = React.useState("");
   const [prenom, setPrenom] = React.useState("");
   const [dateNaissance, setDateNaissance] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      alert("Success!");
      localStorage.setItem("email", email);
      window.location.href = "/Films";
      console.log(
         `Nom: ${nom}, Prénom: ${prenom}, Date de naissance: ${dateNaissance}, Email: ${email}, Password: ${password}`
      );
   };

   if (showRegister) {
      return (
         <Card style={{ padding: "10px", backgroundColor: "white", width: "45%" }}>
            <Grid item xs={1} display="flex" justifyContent="flex-end">
               <Button onClick={() => setShowRegister(false)}>Fermer</Button>
            </Grid>
            <CardContent>
               <Typography variant="h4" component="div" align="center" padding={2}>
                  Signup
               </Typography>
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <TextField
                           label="Nom"
                           type="text"
                           fullWidth
                           required
                           onChange={(e) => setNom(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Prénom"
                           type="text"
                           fullWidth
                           required
                           onChange={(e) => setPrenom(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={6}>
                        <label style={{ color: "#949494" }}>Date de naissance *</label>
                     </Grid>
                     <Grid item xs={12}>
                        <TextField type="date" fullWidth required onChange={(e) => setDateNaissance(e.target.value)} />
                     </Grid>

                     <Grid item xs={12}>
                        <TextField
                           label="Email"
                           type="email"
                           fullWidth
                           required
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Password"
                           type="password"
                           fullWidth
                           required
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Button type="submit" variant="outlined" fullWidth>
                           Se connecter
                        </Button>
                     </Grid>
                  </Grid>
               </form>{" "}
            </CardContent>
         </Card>
      );
   } else {
      return (
         <Card style={{ padding: "10px", backgroundColor: "white" }}>
            <CardContent>
               <Typography variant="h4" component="div" align="center" padding={2}>
                  Login
               </Typography>
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           label="Email"
                           type="email"
                           fullWidth
                           required
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           label="Password"
                           type="password"
                           fullWidth
                           required
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Button type="submit" variant="outlined" fullWidth>
                           Se connecter
                        </Button>
                     </Grid>
                  </Grid>
               </form>
               <Grid item display="flex" justifyContent="center" paddingTop={3}>
                  <Link align="center" onClick={() => setShowRegister(true)}>
                     S'inscrire
                  </Link>
               </Grid>
            </CardContent>
         </Card>
      );
   }
}
