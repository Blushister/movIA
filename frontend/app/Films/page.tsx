"use client";
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

interface Movie {
   movie_id: number;
   title: string;
 }

 const Films: React.FC = () => {

   const [filmTitles, setFilmTitles] = useState<Movie[]>([]);
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get<Movie[]>('http://localhost:3001/movies');
         const filmsData = response.data;
         setFilmTitles(filmsData.slice(0, 10));
       } catch (error) {
         console.error('Erreur lors de la récupération des données :', error);
       }
     };
 
     fetchData();
   }, []);


  const generateImagePath = (movie_id: number) => `http://localhost:3001/posters/${encodeURIComponent(movie_id)}.jpg`;



  return (
   <div className="films-container" style={{ paddingTop: '80px' }}>
      <Grid container spacing={2}>
         {filmTitles.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.4}>
               <Card>
                  <CardMedia
                     component="img"
                     height="140"
                     image={generateImagePath(movie.movie_id)}
                  />
                  <CardContent>
                     <Typography variant="subtitle1" component="div" style={{ fontSize: '14px' }}>
                        {movie.title}
                     </Typography>
                  </CardContent>
               </Card>
            </Grid>
         ))}
      </Grid>
   </div>
  );
};

export default Films;