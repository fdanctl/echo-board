import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import upload from "../config/multerConfig";
import { postTrack, getTrack } from "../controllers/track.controller";

export const router = express.Router();

router.post("/new", authenticateToken, upload.single("track"), postTrack);
router.get("/:id", getTrack);
