import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = () => {
  const app = express();

  // CORS configuration - allow frontend domain in production
  const corsOrigin = process.env.FRONTEND_URL || process.env.CORS_ORIGIN;
  const corsOptions = corsOrigin
    ? { origin: corsOrigin, credentials: true }
    : {}; // {} = allow all (for development)
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/v1", routes);

  app.use(errorHandler);

  return app;
};


