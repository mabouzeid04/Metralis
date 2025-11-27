"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({
        error: { message: err instanceof Error ? err.message : "Internal Server Error" },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map