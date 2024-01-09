import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql2";
import axios from "axios";
import bcrypt from "bcrypt";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

const port = process.env.PORT;
const name = "movIA";
const version = "1.0.0";

const dbConfig = {
   host: "los-santos.fr",
   user: "moveia",
   password: "rqUuHDulPaQGePS",
   database: "moveia",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
   if (err) {
      console.error("Error connecting to MariaDB:", err);
      return;
   }
   console.log("Connected to MariaDB");
});

server.get("/", (_req: Request, res: Response) => {
   res.send(`Api: ${name} \n version: ${version}`);

   /*const query = 'SELECT * FROM Movies';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });*/
});

process.on("SIGINT", () => {
   connection.end();
   process.exit();
});

server.post("/create-user", async (req: Request, res: Response) => {
   const { nom, prenom, age, motdepasse, email } = req.body;
   if (!nom || !prenom || !motdepasse) {
      return res.status(400).json({ error: "Missing required fields" });
   }

   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(motdepasse, saltRounds);

   const insertQuery = "INSERT INTO users (nom, prenom, age, motdepasse, email) VALUES (?, ?, ?, ?, ?)";
   const values = [nom, prenom, age, hashedPassword, email];

   try {
      const [result] = await connection.promise().query(insertQuery, values);
      return res.status(201).json({ message: "User created successfully", result });
   } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred while trying to create the user" });
   }
});

server.post("/login", async (req: Request, res: Response) => {
   const { email, motdepasse } = req.body;
   if (!email || !motdepasse) {
      return res.status(400).json({ error: "Missing required fields" });
   }

   const selectQuery = "SELECT * FROM users WHERE email = ?";
   const values = [email];

   try {
      const [result] = await connection.promise().query(selectQuery, values);
      if (Array.isArray(result) && result.length > 0) {
         return res.status(201).json({ message: "User created successfully", result });
      } else {
         throw new Error("No user inserted");
      }
   } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred while trying to create the user" });
   }
});

server.listen(port, () => {
   console.log(`${name} on http://localhost:${port}/ `);
});
