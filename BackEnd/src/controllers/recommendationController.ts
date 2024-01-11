import { Request, Response } from "express";
import { RowDataPacket } from "mysql2"; // Importez le type approprié pour votre DB
import db from "../db";
import { genresRecommendation } from "../services/ContentBasedRecoService";

// Importez d'autres services de recommandation si nécessaire

export const recommendationController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Ou d'autres paramètres pertinents
    // Récupérer les films déjà notés par l'utilisateur, ou initialiser à vide si aucun film noté
    const ratedMoviesQuery = `SELECT movie_id FROM MovieUsers WHERE user_id = ?`;
    let ratedMovieIds: number[] = [];
    try {
      const [rows] = await db.query<RowDataPacket[]>(ratedMoviesQuery, [
        userId,
      ]);
      const ratedMovies = rows as { movie_id: number }[]; // Assertion de type
      if (ratedMovies.length > 0) {
        ratedMovieIds = ratedMovies.map((movie) => movie.movie_id);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des films déjà notés par l'utilisateur",
        error
      );
    }
    // Extraire les genres de la requête et les transformer en tableau
    const genresQuery = req.query.genres as string | undefined;
    const genres = genresQuery ? genresQuery.split(",") : [];

    let genresRecommendations: any[] = [];
    // Essayer d'obtenir des recommandations basées sur les genres
    try {
      genresRecommendations = await genresRecommendation(db, genres);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des recommandations basées sur les genres",
        error
      );
    }

    // Initialiser un tableau pour toutes les recommandations
    let allRecos = [...genresRecommendations];

    // Ajouter ici des appels à d'autres services de recommandation et fusionner les résultats dans allRecos
    // Filtrer les recommandations pour exclure les films déjà notés
    allRecos = allRecos.filter(
      (reco) => !ratedMovieIds.includes(reco.movie_id)
    );
    if (allRecos.length > 0) {
      // Compter la fréquence de chaque film recommandé
      const recoCounts = allRecos.reduce((acc, reco) => {
        const title = reco.title; // Supposons que reco a un champ 'title'
        acc[title] = (acc[title] || 0) + 1;
        return acc;
      }, {});

      // Trier les films par leur fréquence
      const sortedRecos = Object.keys(recoCounts)
        .sort((a, b) => {
          // Comparer d'abord par fréquence
          const freqDiff = recoCounts[b] - recoCounts[a];
          if (freqDiff !== 0) {
            return freqDiff;
          }

          // En cas d'égalité de fréquence, trier par produit de vote_count et vote_average
          const recoA = allRecos.find((reco) => reco.title === a);
          const recoB = allRecos.find((reco) => reco.title === b);
          const productA = recoA.vote_count * recoA.vote_average;
          const productB = recoB.vote_count * recoB.vote_average;

          return productB - productA; // Tri décroissant
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
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/devFront
