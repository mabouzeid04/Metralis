"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const errorHandler_1 = require("./errorHandler");
const createMockRes = () => {
    const res = {};
    res.status = vitest_1.vi.fn((code) => {
        res.statusCode = code;
        return res;
    });
    res.json = vitest_1.vi.fn((payload) => {
        res.body = payload;
        return res;
    });
    return res;
};
(0, vitest_1.describe)("errorHandler", () => {
    (0, vitest_1.it)("returns error message for Error instances", () => {
        const res = createMockRes();
        const consoleSpy = vitest_1.vi.spyOn(console, "error").mockImplementation(() => undefined);
        (0, errorHandler_1.errorHandler)(new Error("boom"), {}, res, vitest_1.vi.fn());
        (0, vitest_1.expect)(consoleSpy).toHaveBeenCalled();
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.body).toEqual({ error: { message: "boom" } });
        consoleSpy.mockRestore();
    });
    (0, vitest_1.it)("returns generic message for non-Error values", () => {
        const res = createMockRes();
        const consoleSpy = vitest_1.vi.spyOn(console, "error").mockImplementation(() => undefined);
        (0, errorHandler_1.errorHandler)("string-error", {}, res, vitest_1.vi.fn());
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.body).toEqual({ error: { message: "Internal Server Error" } });
        consoleSpy.mockRestore();
    });
});
//# sourceMappingURL=errorHandler.test.js.map