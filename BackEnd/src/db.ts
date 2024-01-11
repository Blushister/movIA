import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
// Configuration de la connexion à la base de données
const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
});



export default  pool ;
