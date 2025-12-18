"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const createPoolMock = () => {
    const poolSpy = vitest_1.vi.fn();
    vitest_1.vi.doMock("pg", () => ({
        Pool: vitest_1.vi.fn((config) => {
            poolSpy(config);
            return { config };
        }),
    }));
    return poolSpy;
};
const importPgModule = async () => {
    vitest_1.vi.resetModules();
    return Promise.resolve().then(() => __importStar(require("./pg")));
};
(0, vitest_1.afterEach)(() => {
    vitest_1.vi.resetModules();
    vitest_1.vi.clearAllMocks();
    vitest_1.vi.unstubAllEnvs();
});
(0, vitest_1.describe)("pg pool configuration", () => {
    (0, vitest_1.it)("enables SSL for supabase-like hosts", async () => {
        const poolSpy = createPoolMock();
        process.env.DATABASE_URL = "postgresql://user:pass@db.supabase.co:5432/db";
        await importPgModule();
        (0, vitest_1.expect)(poolSpy).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        }));
    });
    (0, vitest_1.it)("disables SSL when DATABASE_SSL is false", async () => {
        const poolSpy = createPoolMock();
        process.env.DATABASE_URL = "postgresql://user:pass@db.supabase.co:5432/db";
        process.env.DATABASE_SSL = "false";
        await importPgModule();
        (0, vitest_1.expect)(poolSpy).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            ssl: undefined,
        }));
    });
    (0, vitest_1.it)("uses no SSL for local connections by default", async () => {
        const poolSpy = createPoolMock();
        process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/db";
        delete process.env.DATABASE_SSL;
        await importPgModule();
        (0, vitest_1.expect)(poolSpy).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            ssl: undefined,
        }));
    });
});
//# sourceMappingURL=pg.test.js.map