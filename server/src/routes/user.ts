import express from "express";
import { getOneUser } from "../controllers/user.controller";

export const router = express.Router();

router.get("/:username", getOneUser);
