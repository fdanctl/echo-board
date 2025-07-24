import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import upload from "../config/multerConfig";
import {
  postTrack,
  getTrack,
  commentTrack,
} from "../controllers/track.controller";

export const router = express.Router();

router.post(
  "/new",
  authenticateToken,
  upload.fields([
    { name: "track", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  postTrack,
);
router.get("/:id", getTrack);
router.post("/:id/comment", authenticateToken, commentTrack);
