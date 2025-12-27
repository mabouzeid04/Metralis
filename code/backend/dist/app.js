"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const createApp = () => {
    const app = (0, express_1.default)();
    // CORS configuration - allow configured domains plus local dev by default
    const configuredOrigins = (process.env.FRONTEND_URL || process.env.CORS_ORIGIN || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
    if (process.env.NODE_ENV !== "production") {
        configuredOrigins.push("http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5178", "http://127.0.0.1:5178");
    }
    const uniqueOrigins = Array.from(new Set(configuredOrigins));
    const corsOptions = {
        origin: true,
        credentials: true
    };
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json({ limit: "10mb" }));
    app.get("/health", (_req, res) => res.json({ status: "ok" }));
    app.use("/api/v1", routes_1.default);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map