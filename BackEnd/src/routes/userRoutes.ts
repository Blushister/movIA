import express from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/users/user";

const router = express.Router();

// Route de connexion modifiée pour utiliser les sessions
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.motdepasse); // Assurez-vous que cette fonction correspond à la signature de votre fonction loginUser

    if (user) {
      req.session.user = {
        id: user.id,
        email: user.email,
        // autres informations utiles
      };
      res.status(200).json({ message: "User connected successfully", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

// Route pour créer un utilisateur
router.post("/create-user", createUser);

// Route pour mettre à jour un utilisateur
router.put("/update-user/:id", updateUser);

// Route pour supprimer un utilisateur
router.delete("/delete-user/:id", deleteUser);

// Route de déconnexion
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send("Could not log out, please try again.");
      } else {
        res.clearCookie("connect.sid"); // Efface le cookie de session
        res.status(200).send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});

export default router;
