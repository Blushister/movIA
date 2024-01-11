import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import movieRoutes from "./routes/movieRoutes";

const app = express();

app.use(
  session({
    secret: "your-secret-key", // Utilisez une clé secrète robuste
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Mettez à true si vous utilisez HTTPS
  })
);
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use("/movies", movieRoutes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
