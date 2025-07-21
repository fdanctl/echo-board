import express from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller";

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
