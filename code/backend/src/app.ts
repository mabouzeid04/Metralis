import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = () => {
  const app = express();

  // CORS configuration - allow configured domains plus local dev by default
  const configuredOrigins = (process.env.FRONTEND_URL || process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (process.env.NODE_ENV !== "production") {
    configuredOrigins.push(
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "http://localhost:5175",
      "http://127.0.0.1:5175",
      "http://localhost:5178",
      "http://127.0.0.1:5178",
    );
  }

  const uniqueOrigins = Array.from(new Set(configuredOrigins));

  const corsOptions = {
    origin: true,
    credentials: true
  };

  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "10mb" }));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/v1", routes);

  app.use(errorHandler);

  return app;
};


