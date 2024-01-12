"use client";
import {
   Button,
   Card,
   CardContent,
   Grid,
   IconButton,
   InputAdornment,
   TextField,
   Typography,
} from "@/node_modules/@mui/material/index";
import axios from "@/node_modules/axios/index";
import { Checkbox, FormControl, FormControlLabel, InputLabel, Link, MenuItem, Select } from "@mui/material";
import * as React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginForm() {
   const [showRegister, setShowRegister] = React.useState(false);
   const [nom, setNom] = React.useState("");
   const [prenom, setPrenom] = React.useState("");
   const [age, setAge] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [motdepasse, setMotdepasse] = React.useState("");
   const [sexe, setSexe] = React.useState("");
   const [showPassword, setShowPassword] = React.useState(false);

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
         localStorage.setItem("name", nom);
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

   const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const handleMouseDownPassword = (event: any) => {
      event.preventDefault();
   };

   if (showRegister) {
      return (
         <Card style={{ padding: "10px", backgroundColor: "white", width: "60%", overflow: "auto", height: "auto" }}>
            <Grid item xs={1} display="flex" justifyContent="flex-end">
               <Button onClick={() => setShowRegister(false)}>Fermer</Button>
            </Grid>
            <CardContent>
               <Typography variant="h4" component="div" align="center" paddingBottom={2}>
                  Signup
               </Typography>
               <form onSubmit={handleSignUp}>
                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <TextField
                           size="small"
                           label="Nom"
                           type="text"
                           fullWidth
                           required
                           onChange={(e: any) => setNom(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           size="small"
                           label="Prénom"
                           type="text"
                           fullWidth
                           required
                           onChange={(e: any) => setPrenom(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           size="small"
                           label="Age"
                           type="text"
                           fullWidth
                           required
                           onChange={(e: any) => setAge(e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl fullWidth required>
                           <InputLabel id="genre-label">Sexe</InputLabel>
                           <Select
                              size="small"
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
                           onChange={(e: any) => setEmail(e.target.value)}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end" sx={{ paddingRight: "6px" }}>
                                    <MailOutlineIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           size="small"
                           label="Password"
                           type={showPassword ? "text" : "password"}
                           fullWidth
                           required
                           onChange={(e: any) => setMotdepasse(e.target.value)}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       aria-label="toggle"
                                       onClick={handleClickShowPassword}
                                       onMouseDown={handleMouseDownPassword}
                                    >
                                       {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Grid>

                     <Grid item xs={12}>
                        <Typography variant="h6" component="div" align="center" padding={2}>
                           Choisissez un ou plusieurs genres de votre préférence.
                        </Typography>
                     </Grid>

                     {genres.map((genre, index) => (
                        <Grid item xs={3} key={index}>
                           <FormControlLabel
                              control={
                                 <Checkbox
                                    size="small"
                                    color="secondary"
                                    checked={selectedGenres.some((genreObj) => genreObj.id === Number(genre.genre_id))}
                                    onChange={(event: any) =>
                                       handleCheckboxChange(event, { genre_id: genre.genre_id, name: genre.name })
                                    }
                                 />
                              }
                              label={`${genre.name}`}
                           />
                        </Grid>
                     ))}
                  </Grid>
                  <br />
                  <Button
                     type="submit"
                     variant="outlined"
                     fullWidth
                     onSubmit={handleSignUp}
                     sx={{ color: "black", bgcolor: "#e7ecef", borderColor: "#212529" }}
                  >
                     Valider
                  </Button>
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
               <form onSubmit={handleLogin} style={{ paddingBottom: "1rem" }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           label="Email"
                           type="email"
                           fullWidth
                           required
                           onChange={(e: any) => setEmail(e.target.value)}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end" sx={{ paddingRight: "6px" }}>
                                    <MailOutlineIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Grid>

                     <Grid item xs={12}>
                        <TextField
                           label="Password"
                           type={showPassword ? "text" : "password"}
                           fullWidth
                           required
                           onChange={(e: any) => setMotdepasse(e.target.value)}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       aria-label="toggle"
                                       onClick={handleClickShowPassword}
                                       onMouseDown={handleMouseDownPassword}
                                    >
                                       {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Grid>
                     <Grid item xs={8}>
                        <Button
                           type="submit"
                           variant="outlined"
                           fullWidth
                           sx={{ color: "black", bgcolor: "#e7ecef", borderColor: "#212529" }}
                        >
                           Se connecter
                        </Button>
                     </Grid>
                     <Grid item xs={4}>
                        <Button
                           type="submit"
                           variant="outlined"
                           fullWidth
                           sx={{ color: "#212529", borderColor: "#212529" }}
                           onClick={() => setShowRegister(true)}
                        >
                           S'inscrire !
                        </Button>
                     </Grid>
                  </Grid>
               </form>
            </CardContent>
         </Card>
      );
   }
}
