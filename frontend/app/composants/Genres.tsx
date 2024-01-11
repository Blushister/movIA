import { Card, Grid, CardContent, Typography, Button, FormControlLabel, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginForm from "./Login";

export default function Genres() {
   const handleSignUp = LoginForm;
   const [genres, setGenres] = useState<{ name: string }[]>([]);
   const [selectedGenres, setSelectedGenres] = useState<{ name: string }[]>([]);

   useEffect(() => {
      const genre = fetch("http://localhost:3001/genres")
         .then((response) => response.json())
         .then((data) => setGenres(data));
      console.log(genre);
   }, []);
   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, genre: { name: string }) => {
      setSelectedGenres((prev) => (event.target.checked ? [...prev, genre] : prev.filter((g) => g !== genre)));
   };
   return (
      <Card style={{ padding: "1rem", width: "50%", height: "150vh", overflow: "auto" }}>
         <Grid container spacing={2}>
            {genres.map((genre, index) => (
               <Grid item xs={4} key={index}>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={selectedGenres.includes(genre)}
                           onChange={(event) => handleCheckboxChange(event, genre)}
                        />
                     }
                     label={genre.name}
                  />
               </Grid>
            ))}
         </Grid>
         <Button type="submit" variant="outlined" fullWidth onSubmit={handleSignUp}>
            Valider
         </Button>
      </Card>
   );
}
