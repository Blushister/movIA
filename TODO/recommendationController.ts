import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import db from "../db";
import { genresRecommendation } from "../services/ContentBasedRecoService";

// Importez d'autres services de recommandation si nécessaire

export const recommendationController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Assurez-vous que userId est bien passé dans les paramètres
    const ratedMoviesQuery = `SELECT movie_id FROM MovieUsers WHERE user_id = ?`;
    let ratedMovieIds: number[] = [];

    try {
      const [rows] = await db.query<RowDataPacket[]>(ratedMoviesQuery, [
        userId,
      ]);
      ratedMovieIds = rows.map((row: any) => row.movie_id); // Simplification de la conversion
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des films déjà notés",
        error
      );
    }

    const genresQuery = req.query.genres as string | undefined;
    const genres = genresQuery ? genresQuery.split(",") : [];

    let genresRecommendations: any[] = [];
    try {
      genresRecommendations = await genresRecommendation(db, genres);
    } catch (error) {
      console.error(
        "Erreur dans les recommandations basées sur les genres",
        error
      );
    }

    /*     let OverviewRecommendations: any[] = [];
    try {
      OverviewRecommendations = await OverviewRecommendation(db, userId); // Remplacement de user_id par userId
    } catch (error) {
      console.error(
        "Erreur dans les recommandations basées sur le contenu",
        error
      );
    } */

    let allRecos = [...genresRecommendations]; // Fusion des recommandations

    allRecos = allRecos.filter(
      (reco) => !ratedMovieIds.includes(reco.movie_id)
    );

    if (allRecos.length > 0) {
      const recoCounts = allRecos.reduce((acc, reco) => {
        acc[reco.title] = (acc[reco.title] || 0) + 1;
        return acc;
      }, {});

      const sortedRecos = Object.keys(recoCounts)
        .sort((a, b) => {
          const freqDiff = recoCounts[b] - recoCounts[a];
          if (freqDiff !== 0) return freqDiff;

          const recoA = allRecos.find((reco) => reco.title === a);
          const recoB = allRecos.find((reco) => reco.title === b);
          const productA = recoA.vote_count * recoA.vote_average;
          const productB = recoB.vote_count * recoB.vote_average;

          return productB - productA;
        })
        .map((title) => allRecos.find((reco) => reco.title === title));

      res.json(sortedRecos);
    } else {
      res.status(404).send("Aucune recommandation disponible");
    }
  } catch (error) {
    console.error("Erreur dans le contrôleur de recommandation", error);
    res.status(500).send("Internal Server Error");
  }
};
