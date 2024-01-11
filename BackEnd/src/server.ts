import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import movieRoutes from "./routes/movieRoutes";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(movieRoutes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
