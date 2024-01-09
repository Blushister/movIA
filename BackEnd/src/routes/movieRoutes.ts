import express from "express";
import { recommendationsController } from "../controllers/recommendationController";

const router = express.Router();

router.get("/recommendations", recommendationsController);

export default router;
