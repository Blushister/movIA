import { Pool } from "mysql2/promise";

interface UserRecommendation {
  movie_Id: number;
  title: string;
  count: number; // Nombre de fois que le film a été regardé par des utilisateurs similaires
}

export const getUserBasedRecommendations = async (
  db: Pool,
  id: number,
  age: number,
  gender: string
): Promise<UserRecommendation[]> => {
  // Calculer la tranche d'âge
  const ageGroupStart = Math.floor(age / 5) * 5;
  const ageGroupEnd = ageGroupStart + 5;

  try {
    // Exécuter une requête pour trouver des films populaires parmi les utilisateurs du même groupe d'âge et sexe
    const [rows] = await db.query(
      `
            SELECT m.movie_id,
            FROM userMovies um
            JOIN movies m ON um.movie_id = m.movie_id
            JOIN users u ON um.user_id = u.user_id
            WHERE u.age BETWEEN ? AND ? AND u.gender = ?
            GROUP BY um.movie_id
            ORDER BY count DESC
            LIMIT 10
        `,
      [ageGroupStart, ageGroupEnd, gender]
    );

    return rows as UserRecommendation[];
  } catch (error) {
    console.error("Error fetching user-based recommendations:", error);
    throw error;
  }
};
