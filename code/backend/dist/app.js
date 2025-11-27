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
    // CORS configuration - allow frontend domain in production
    const corsOrigin = process.env.FRONTEND_URL || process.env.CORS_ORIGIN;
    const corsOptions = corsOrigin
        ? { origin: corsOrigin, credentials: true }
        : {}; // {} = allow all (for development)
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    app.get("/health", (_req, res) => res.json({ status: "ok" }));
    app.use("/api/v1", routes_1.default);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map