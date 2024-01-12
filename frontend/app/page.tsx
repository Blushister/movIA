"use client";
import { Button, Grid, Rating, Slide, Typography, styled } from "@mui/material";
import "./css/style.css";
import React from "react";

export default function Home() {
   // const [films, setFilms] = React.useState([]);

   // React.useEffect(() => {
   //    fetch("http://localhost:3001/movies/recommendations")
   //       .then((response) => response.json())
   //       .then((data) => {
   //          setFilms(data);
   //       });
   // }, []);

   // const CardCont = styled("div")({
   //    width: "80%",
   //    height: "70%",
   // });

   return (
      <main>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
               flexDirection: "column",
               width: "60%",
               margin: " 0 auto",
            }}
         >
            <Typography variant="h2" padding={2} letterSpacing={6}>
               MovIA
            </Typography>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={{ enter: 1500 }}>
               <Typography variant="h6" padding={2} align="center" letterSpacing={3} lineHeight={2} fontSize={20}>
                  Pour profiter pleinement de notre plateforme de recommandation de films, vous devrez d'abord vous
                  inscrire. Cette inscription vous permettra de personnaliser vos filtres et de recevoir des suggestions
                  de films basées sur vos goûts. <br /> Notre système utilise l'IA pour analyser vos préférences et
                  trouver les films qui correspondent le mieux à votre profil. Une fois inscrit, vous pourrez explorer,
                  sauvegarder des films dans votre liste.
               </Typography>
            </Slide>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={{ enter: 2000 }}>
               <Button href="/login"  sx={{ color: "white", backgroundColor: "#212529", fontSize: "12px", letterSpacing: "5px" }} size="large">
                  Découvrez !
               </Button>
            </Slide>

            {/* <CardCont>
               <Grid container spacing={2} overflow={"auto"}>
                  {films.map((film: { title: string; genres: string; vote_average: number }, index: number) => (
                     <Grid item xs={4} key={index}>
                        <Button style={{ color: "black", backgroundColor: "#e8e8e4", fontSize: "12px" }}>
                           {film.title} <br />
                           {film.genres}
                        </Button>

                        <Rating size="small" value={film.vote_average / 2} readOnly />
                     </Grid>
                  ))}
               </Grid>
            </CardCont> */}
            {/* <LoginForm /> */}
         </div>
      </main>
   );
}
