"use client";
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Autocomplete,
   Card,
   CardMedia,
   Grid,
   InputAdornment,
   Rating,
   TextField,
   Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface Movie {
   movie_id: number;
   title: string;
   genres: string;
}
const Films: React.FC = () => {
   const [filmTitles, setFilmTitles] = useState<Movie[]>([]);
   const [openMovieId, setOpenMovieId] = useState<number | null>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [value, setValue] = useState(0);
   console.log("La valeur de la note est : ", value);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get<Movie[]>("http://localhost:3001/movies/recommendations");
            const filmsData = response.data;
            console.log(filmsData);
            //! Id a stocker dans une variable
            console.log(filmsData[0].movie_id);
            setFilmTitles(filmsData.slice(0, 12));
         } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
         }
      };

      fetchData();
   }, []);

   const generateImagePath = (movie_id: number) =>
      `http://localhost:3001/movies/posters/${encodeURIComponent(movie_id)}`;

   const truncateTitle = (title: string, maxLength: number) => {
      if (title.length > maxLength) {
         return title.slice(0, maxLength - 3) + "...";
      } else {
         return title;
      }
   };

   return (
   
      <div style={{ padding: "80px", alignContent: "center" }}>
         <br />
         <Autocomplete
            size="small"
            freeSolo
            options={filmTitles.map((movie) => movie.title)}
            onInputChange={(event, newInputValue) => {
               setSearchTerm(newInputValue);
            }}
            sx={{ bgcolor: "#ced4da", borderRadius: "5px", width: "99%" }}
            renderInput={(params) => (
               <TextField
                  {...params}
                  label="Recherche"
                  InputProps={{
                     ...params.InputProps,
                     endAdornment: (
                        <InputAdornment position="end">
                           <SearchIcon />
                        </InputAdornment>
                     ),
                  }}
               />
            )}
         />
         <br />
         <br />
         <Grid container spacing={3}>
            {filmTitles
               .filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
               .map((movie, index) => {
                  const truncatedTitle = truncateTitle(movie.title, 15);
                  return (
                     <Grid item key={index} xs={12} sm={2} md={3} lg={2} xl={2}>
                        <Card sx={{ maxWidth: 230 }}>
                           <CardMedia
                              component="img"
                              image={generateImagePath(movie.movie_id)}
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
                           />
                           <Accordion
                              sx={{ bgcolor: "#ced4da" }}
                              onClick={() => setOpenMovieId(movie.movie_id)}
                              onMouseEnter={(event: any) => event.currentTarget.querySelector("div").click()}
                              onMouseLeave={(event: any) => event.currentTarget.querySelector("div").click()}
                           >
                              <AccordionSummary
                                 aria-controls="panel1-content"
                                 id="panel1-header"
                                 expandIcon={<ExpandMoreIcon />}
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    overflow: "hidden",
                                 }}
                              >
                                 <div
                                    style={{
                                       overflow: "hidden",
                                       textOverflow: "ellipsis",
                                       whiteSpace: "normal",
                                       maxHeight: "8rem",
                                       lineHeight: "2rem",
                                    }}
                                 >
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                       {openMovieId === movie.movie_id ? movie.title : truncatedTitle}
                                    </Typography>
                                 </div>
                              </AccordionSummary>

                              <AccordionDetails style={{ position: "relative", zIndex: 9999 }}>
                                 <Typography>
                                    <span style={{ fontWeight: "bold" }}> Genres : </span>
                                    {movie.genres}
                                 </Typography>
                                 <Typography component="legend" fontSize={"13px"} paddingTop={2}>
                                    <i>Notez vous même ce film</i>
                                 </Typography>
                                 <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue: any) => {
                                       setValue(newValue);
                                    }}
                                 />
                              </AccordionDetails>
                           </Accordion>
                        </Card>
                     </Grid>
                  );
               })}
         </Grid>
      </div>
   );
};

export default Films;
