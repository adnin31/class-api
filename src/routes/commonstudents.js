import express from "express";
import { commonstudents } from "../controllers/commonstudentsController.js";

const router = express.Router();

router.get("/commonstudents", commonstudents);

export default router;
