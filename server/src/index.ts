import express, { Request, Response } from "express";
import cors from "cors";
import { router as authRoutes } from "./routes/auth";
import { router as trackOptionsRoutes } from "./routes/trackOptions";
import { router as userRoutes } from "./routes/user";
import { router as tracksRoutes } from "./routes/tracks";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/track-options", trackOptionsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tracks", tracksRoutes);

// error handler middleware
app.use(errorHandler);

// start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
