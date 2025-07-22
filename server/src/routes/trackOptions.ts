import express from "express";
import { getAllTrackOptions } from "../controllers/trackOptions.controller";

export const router = express.Router();

router.get("/", getAllTrackOptions);
