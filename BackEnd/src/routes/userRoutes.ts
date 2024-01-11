import express from "express";
import { createUser, loginUser, updateUser, deleteUser } from "../controllers/user/user";

const router = express.Router();

router.post("/login", loginUser);
router.post("/create-user", createUser);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
