// movieRoutes.js
import express, { Request, Response } from "express";
import { recommendationController } from "../controllers/recommendationController";

const router = express.Router();

// Route pour les recommandations
router.get("/recommendations", recommendationController);

// Route pour obtenir les affiches de films
router.get('/posters/:movieId', (req: Request, res: Response) => {
    const movieId = req.params.movieId;
    const posterPath = `./posters/${movieId}.jpg`;

    res.sendFile(posterPath, { root: '.' }, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            if (!res.headersSent) {
                res.status(404).send('Poster not found');
            }
        }
    });
});


export default router;
