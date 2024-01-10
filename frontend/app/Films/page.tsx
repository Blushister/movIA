"use client";
import { Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Films = () => {
  const [filmTitles, setFilmTitles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:3001/movies');

        const filmsData = response.data;

        const titles = filmsData.map((film: { title: any; }) => film.title);

        setFilmTitles(titles.slice(0, 10));
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };


    fetchData();
  }, []);

  return (
   <div className="films-container" style={{ paddingTop: '80px' }}>
      <Grid container spacing={2}>
         {filmTitles.map((title, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.4}>
               <Card>
                  <CardContent>
                     <Typography variant="subtitle1" component="div" style={{ fontSize: '14px' }}>
                        {title}
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