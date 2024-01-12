"use client";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";

export default function page() {
   const [userInfo, setUserInfo] = useState({
      nom: "",
      prenom: "",
      email: "",
      age: "",
      sexe: "",
      motdepasse: "",
      user_id: null,
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const email = localStorage.getItem("email");
            const response = await axios.get(`http://localhost:3001/getUserInfo/${email}`);
            const UserData = response.data;
            
            console.log(UserData);
            //! id a stocker dans une variable
            console.log(UserData.result[0].user_id);

            setUserInfo(UserData.result[0]);
            return alert("Modifications réussie !");
            window.location.reload();
            
         } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
         }
      };

      fetchData();
   }, []);

   // Gestion des changements de champ de formulaire
   const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      setUserInfo((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };
   const handleSubmitUpdate = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
         const response = await axios.put(`http://localhost:3001/update-user/${userInfo.user_id}`, userInfo);
         console.log(response.data);
      } catch (error) {
         console.error("Erreur lors de la mise à jour des données :", error);
      }
   };

   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "10rem",
            flexDirection: "column",
            width: "60%",
            margin: " 0 auto",
         }}
      >
         <form
            onSubmit={handleSubmitUpdate}
            style={{ padding: "3rem", backgroundColor: "#ced4da", borderRadius: "5px" }}
         >
            <Typography variant="h4" component="div" align="center" paddingBottom={2}>
               Informations personnelles
            </Typography>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField fullWidth label="Nom" name="nom" value={userInfo.nom || ""} onChange={handleInputChange} />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Prénom"
                     name="prenom"
                     value={userInfo.prenom || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Email"
                     name="email"
                     value={userInfo.email || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField fullWidth label="Age" name="age" value={userInfo.age || ""} onChange={handleInputChange} />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Sexe"
                     name="sexe"
                     value={userInfo.sexe || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     label="Mot de passe"
                     name="motdepasse"
                     fullWidth
                     //  value={userInfo.motdepasse || ""}
                     onChange={handleInputChange}
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button fullWidth type="submit">
                     Valider
                  </Button>
               </Grid>
            </Grid>
         </form>
      </div>
   );
}
