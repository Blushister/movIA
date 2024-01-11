import express from "express";
import { recommendationController } from "../controllers/recommendationController";

const router = express.Router();

router.get("/recommendations", recommendationController);

export default router;
