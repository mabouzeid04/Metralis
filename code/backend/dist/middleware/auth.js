"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: { message: "Unauthorized" } });
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
        return res.status(401).json({ error: { message: "Unauthorized" } });
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = {
            id: payload.sub,
            role: payload.role,
            email: payload.email,
            name: payload.name,
            status: payload.status,
        };
        return next();
    }
    catch {
        return res.status(401).json({ error: { message: "Invalid token" } });
    }
};
exports.requireAuth = requireAuth;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: { message: "Forbidden" } });
        }
        return next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.js.map