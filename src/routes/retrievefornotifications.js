import express from "express";
import { retrieveForNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/retrievefornotifications", retrieveForNotifications);

export default router;
