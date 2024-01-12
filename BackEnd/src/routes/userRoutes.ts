import express from "express";
import { createUser, loginUser, updateUser, deleteUser, getUserInfo } from "../controllers/user/user";

const router = express.Router();

router.post("/login", loginUser);
router.post("/create-user", createUser);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);
router.get('/getUserInfo/:email', getUserInfo);


export default router;
