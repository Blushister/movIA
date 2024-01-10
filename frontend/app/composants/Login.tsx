"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import axios from "axios";

export default function LoginForm() {
   const [showRegister, setShowRegister] = React.useState(false);
   const [nom, setNom] = React.useState("");
   const [prenom, setPrenom] = React.useState("");
   const [age, setAge] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [motdepasse, setMotdepasse] = React.useState("");

   const handleSignUp = async () => {
      try {
         const response = await axios.post("http://localhost:3001/create-user", {
            nom,
            prenom,
            age, // Ajoutez un champ d'âge et de sexe si nécessaire
            motdepasse,
            email,
         });
         console.log(response);
         alert("Inscription réussie !");
         // window.location.href = "/login"; // Rediriger vers la page de connexion après l'inscription
      } catch (error) {
         console.error(error);
         alert("Erreur d'inscription. Veuillez vérifier vos informations.");
      }
   };

   const handleLogin = async () => {
      try {
         const response = await axios.post("http://localhost:3001/login", {
            email,
            motdepasse,
         });
         console.log(response.data);
         alert("Success!");
         // localStorage.setItem("email", email);
         window.location.href = "/Films";
      } catch (error) {
         console.error(error);
         alert("Erreur de connexion. Veuillez vérifier vos identifiants.");
      }
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
               <form onSubmit={handleSignUp}>
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
                     {/* <Grid item xs={6}>
                        <label style={{ color: "#949494" }}>Date de naissance *</label>
                     </Grid> */}
                     <Grid item xs={12}>
                        <TextField  label="Age" type="text" fullWidth required onChange={(e) => setAge(e.target.value)} />
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
                           onChange={(e) => setMotdepasse(e.target.value)}
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
               <form onSubmit={handleLogin}>
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
                           onChange={(e) => setMotdepasse(e.target.value)}
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
