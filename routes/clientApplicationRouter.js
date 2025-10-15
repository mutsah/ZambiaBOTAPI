import express from "express";
import { newApplication } from "../controllers/clientApplicationController.js";

const router = express.Router();

router.post("/newApplication", newApplication);

export default router;
