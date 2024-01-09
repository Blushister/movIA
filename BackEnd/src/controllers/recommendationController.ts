import { Request, Response } from "express";
import db from "../db";
import { simpleRecoService } from "../services/simpleRecoService";

export const recommendationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const genres = req.query.genres as string;
    const recommendations = await simpleRecoService(db, genres);
    res.json(recommendations);
  } catch (error) {
    res.status(500).send("Erreur interne du serveur");
  }
};
