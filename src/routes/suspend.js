import express from "express";
import { suspendStudent } from "../controllers/suspendStudentController.js";

const router = express.Router();

router.post("/suspend", suspendStudent);

export default router;