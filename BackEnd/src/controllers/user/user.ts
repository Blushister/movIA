import { OkPacket } from "mysql2";
import pool from "../db";
import bcrypt from "bcrypt";

// CONNECTION
export const loginUser = async (req: any, res: any) => {
   const { email, motdepasse } = req.body;
   // if (!email || !motdepasse) {
   //    return res.status(400).json({ error: "Missing required fields" });
   // }

   const selectQuery = "SELECT * FROM Users WHERE email = ?";
   const values = [email];

   try {
      const [result] = await pool.query(selectQuery, values);
      if (Array.isArray(result) && result.length > 0) {
         return res.status(201).json({ message: "User connected successfully", result });
      } else {
         throw new Error("No user inserted");
      }
   } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred while trying to create the user" });
   }
};

// INSCRIPTION

export const createUser = async (req: any, res: any) => {
   const { nom, prenom, age, sexe, motdepasse, email, genres = [] } = req.body;

   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(motdepasse, saltRounds);

   const insertQuery = "INSERT INTO Users (nom, prenom, age, sexe, motdepasse, email) VALUES (?, ?, ?, ?, ?, ?)";
   const values = [nom, prenom, age, sexe, hashedPassword, email];

   try {
      const [result] = await pool.query(insertQuery, values);
      console.log(result);
      const okPacket = result as OkPacket;
      const user = {
         message: "User created successfully",
         id: okPacket.insertId,
      };
      console.log(user.id);
      console.log(genres);

      // Insertion du genre de l'utilisateur
      if (genres && Array.isArray(genres)) {
         for (let genre_id of genres) {
            const sqlInsertUserGenre = "INSERT INTO UserGenre (user_id, genre_id) VALUES (?, ?)";
            const valuesUserGenre = [user.id, genre_id];
            await pool.query(sqlInsertUserGenre, valuesUserGenre);
         }
      }
      return res.status(201).json({ message: "User created successfully", result, user });
   } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred while trying to create the user" });
   }
};

// MODIFIER
export const updateUser = async (req: any, res: any) => {
   const { id } = req.params;
   const updates = req.body;

   if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No updates provided" });
   }

   const updateFields = [];
   const updateValues = [];

   for (let field in updates) {
      if (field === "motdepasse") {
         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(updates[field], saltRounds);
         updateFields.push(`${field} = ?`);
         updateValues.push(hashedPassword);
      } else {
         updateFields.push(`${field} = ?`);
         updateValues.push(updates[field]);
      }
   }

   const updateQuery = `UPDATE Users SET ${updateFields.join(", ")} WHERE id = ?`;
   updateValues.push(id);

   try {
      await pool.query(updateQuery, updateValues);
      return res.status(200).json({ message: "User updated successfully" });
   } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred while trying to update the user" });
   }
};

// DELETE
export const deleteUser = async (req: any, res: any) => {
   const { id } = req.params;

   // if (!id) {
   //    return res.status(400).json({ error: "Missing required fields" });
   // }

   const deleteQuery = "DELETE FROM Users WHERE id = ?";
   const values = [id];

   try {
      await pool.query(deleteQuery, values);
      return res.status(200).json({ message: "User deleted successfully" });
   } catch (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "An error occurred while trying to delete the user" });
   }
};
