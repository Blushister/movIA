import { Request, Response } from "express";
import db from "../db";
import { simpleRecoService } from "../services/simpleRecoService";

export const recommendationsController = async (
  req: Request,
  res: Response
) => {
  try {
    // Extraire les genres de la requête et les transformer en tableau
    const genresQuery = req.query.genres as string | undefined;
    const genres = genresQuery ? genresQuery.split(",") : [];

    // Appeler simpleRecoService avec le tableau de genres
    const recommendations = await simpleRecoService(db, genres);
    res.json(recommendations);
  } catch (error) {
    res.status(500).send("Erreur interne du serveur");
  }
};
