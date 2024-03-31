import { Router } from "express";
import { addCameraConfig, getCameraConfig } from "./camConfig.controller.js";
const router = Router();

router.post("/", addCameraConfig);
router.get("/", getCameraConfig);

export default router;
