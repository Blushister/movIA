import { Pool, RowDataPacket } from "mysql2/promise";

// Définition des interfaces pour les types de résultats de requête
interface Movie extends RowDataPacket {
  title: string;
  vote_count: number;
  vote_average: number;
  genres: string;
}

interface GlobalStats extends RowDataPacket {
  avg_rating: number;
  total_movies: number;
}

export const simpleRecoService = async (
  db: Pool,
  genre: string | null = null
): Promise<Movie[]> => {
  try {
    // Récupérer les statistiques globales des films
    const [globalStats] = await db.query<GlobalStats[]>(`
      SELECT AVG(vote_average) AS avg_rating, COUNT(*) AS total_movies
      FROM Movies
    `);
    const { avg_rating: C, total_movies } = globalStats[0];
    const m = total_movies * 0.95; // 95th percentile

    // Construire la requête de base
    let query = `
      SELECT Movies.title, Movies.vote_count, Movies.vote_average, GROUP_CONCAT(Genres.name SEPARATOR ', ') AS genres
      FROM Movies
      JOIN MovieGenres ON Movies.movie_id = MovieGenres.movie_id
      JOIN Genres ON MovieGenres.genre_id = Genres.genre_id
      WHERE Movies.vote_count >= ?
      GROUP BY Movies.movie_id
    `;
    const params: Array<number | string> = [m];

    // Filtrer par genre si spécifié
    if (genre) {
      query += " HAVING genres LIKE ?";
      params.push(`%${genre}%`);
    }

    // Récupérer les films qualifiés
    const [movies] = await db.query<Movie[]>(query, params);

    // Calculer le score pondéré pour chaque film
    const qualifiedMovies = movies.map((movie) => ({
      ...movie,
      weightedRating:
        (movie.vote_count / (movie.vote_count + m)) * movie.vote_average +
        (m / (movie.vote_count + m)) * C,
    }));

    // Trier les films par score pondéré
    qualifiedMovies.sort((a, b) => b.weightedRating - a.weightedRating);
    console.log(qualifiedMovies);

    // Retourner les 250 meilleurs films
    return qualifiedMovies.slice(0, 250);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
