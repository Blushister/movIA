"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControl, FormControlLabel, InputLabel, Link, MenuItem, Select } from "@mui/material";
import axios from "axios";

export default function LoginForm() {
   const [showRegister, setShowRegister] = React.useState(false);
   const [nom, setNom] = React.useState("");
   const [prenom, setPrenom] = React.useState("");
   const [age, setAge] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [motdepasse, setMotdepasse] = React.useState("");
   const [sexe, setSexe] = React.useState("");
   const [selectedGenres, setSelectedGenres] = React.useState<{ id: number; name: string }[]>([]);
   const [genres, setGenres] = React.useState<
      {
         genre_id: number | undefined;
         name: string;
      }[]
   >([]);

   // fonction qui valide le formulaire d'inscription
   const handleSignUp = async () => {
      try {
         const genreIds = selectedGenres.map((genre) => genre.id);
         const response = await axios.post("http://localhost:3001/create-user", {
            nom,
            prenom,
            age,
            sexe,
            motdepasse,
            email,
            genres: genreIds,
         });
         console.log(response);
         alert("Inscription réussie !");
         window.location.href = "/films";
      } catch (error) {
         console.error(error);
         alert("Erreur d'inscription. Veuillez vérifier vos informations.");
      }
   };

   // fonction qui valide le formulaire de connection
   const handleLogin = async () => {
      try {
         const response = await axios.post("http://localhost:3001/login", {
            email,
            motdepasse,
         });
         console.log(response.data);
         alert("Success!");
         localStorage.setItem("email", email);
         window.location.href = "/films";
      } catch (error) {
         console.error(error);
         alert("Erreur de connexion. Veuillez vérifier vos identifiants.");
      }
   };

   // recupere les genres dans la bdd
   React.useEffect(() => {
      fetch("http://localhost:3001/genres")
         .then((response) => response.json())
         .then((data) => {
            setGenres(data);
         });
   }, []);

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      genre: { genre_id: number | undefined; name: string }
   ) => {
      if (genre.genre_id !== undefined) {
         setSelectedGenres((prev) => {
            const genreId = Number(genre.genre_id);
            if (event.target.checked) {
               // Vérifie si le genre existe déjà dans selectedGenres
               const genreExists = prev.find((genreObj) => genreObj.id === genreId);
               if (!genreExists) {
                  // Si le genre n'existe pas, ajoutez-le
                  return [...prev, { id: genreId, name: genre.name }];
               }
            } else {
               // Supprimez le genre de selectedGenres
               return prev.filter((genreObj) => genreObj.id !== genreId);
            }
            // Retournez l'état précédent si aucune modification n'a été apportée
            return prev;
         });
      }
   };

   const handleSexeChange = (event: any) => {
      setSexe(event.target.value);
   };

   if (showRegister) {
      return (
         <Card style={{ padding: "10px", backgroundColor: "white", width: "45%", overflow: "auto" }}>
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
                     <Grid item xs={12}>
                        <TextField
                           label="Age"
                           type="text"
                           fullWidth
                           required
                           onChange={(e) => setAge(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth required>
                           <InputLabel id="genre-label">Sexe</InputLabel>
                           <Select
                              labelId="genre-label"
                              id="genre-select"
                              value={sexe}
                              label="Sexe"
                              onChange={handleSexeChange}
                           >
                              <MenuItem value={"feminin"}>Féminin</MenuItem>
                              <MenuItem value={"masculin"}>Masculin</MenuItem>
                           </Select>
                        </FormControl>
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

                     <Grid container spacing={2}>
                        {genres.map((genre, index) => (
                           <Grid item xs={4} key={index}>
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       checked={selectedGenres.some(
                                          (genreObj) => genreObj.id === Number(genre.genre_id)
                                       )}
                                       onChange={(event) =>
                                          handleCheckboxChange(event, { genre_id: genre.genre_id, name: genre.name })
                                       }
                                    />
                                 }
                                 // label={`${genre.name} ${genre.genre_id}`} // Affichez l'ID et le nom du genre
                                 label={`${genre.name}`}
                              />
                           </Grid>
                        ))}
                     </Grid>

                     <Button type="submit" variant="outlined" fullWidth onSubmit={handleSignUp}>
                        Valider
                     </Button>
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
