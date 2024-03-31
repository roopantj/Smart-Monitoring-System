import { Router } from "express";
import { getAlerts, createAlert } from "./alert.controller.js";

const router = Router();

router.post("/", createAlert);
router.get("/", getAlerts);

export default router;
