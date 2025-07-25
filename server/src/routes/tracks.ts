import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import upload from "../config/multerConfig";
import {
  postTrack,
  getTracks,
  getTrack,
  commentTrack,
  likeTrack,
  unlikeTrack,
} from "../controllers/track.controller";
import { authenticateTokenOptional } from "../middleware/authenticateTokenOptional";

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
router.get("/", getTracks);
router.get("/:id", authenticateTokenOptional, getTrack);
router.post("/:id/like", authenticateToken, likeTrack);
router.post("/:id/unlike", authenticateToken, unlikeTrack);
router.post("/:id/comment", authenticateToken, commentTrack);
