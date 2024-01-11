import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import movieRoutes from "./routes/movieRoutes";
import pool from "./db";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use("/movies", movieRoutes);
server.use("/", userRoutes);

const port = process.env.PORT;

async function getGenres() {
   try {
      const [rows] = await pool.query("SELECT * FROM Genres");
      return rows;
   } catch (error) {
      console.error("Error executing query:", error);
      throw error;
   }
}
server.get("/genres", async (req, res) => {
   try {
      const genres = await getGenres();
      return res.json(genres);
   } catch (error) {
      console.error("Error getting genres:", error);
      return res.status(500).json({ error: "An error occurred while trying to get the genres" });
   }
});

server.post('/user-genre', async (req, res) => {
   const { user_id, genres } = req.body;
  
   try {
     const sqlInsert = "INSERT INTO UserGenre (user_id, genre_id) VALUES (?, ?)";
     const values = [user_id, genres];
     await pool.query(sqlInsert, values);
     res.status(201).json({ message: "UserGenre created successfully" });
   } catch (error) {
     console.error("Error executing query:", error);
     res.status(500).json({ error: "An error occurred while trying to create the UserGenre" });
   }
  });


server.listen(port, () => {
   console.log(`Server running on http://localhost:${port}/`);
});
