"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const machines_1 = __importDefault(require("./machines"));
const workOrders_1 = __importDefault(require("./workOrders"));
const parts_1 = __importDefault(require("./parts"));
const documents_1 = __importDefault(require("./documents"));
const users_1 = __importDefault(require("./users"));
const dashboard_1 = __importDefault(require("./dashboard"));
const search_1 = __importDefault(require("./search"));
const profile_1 = __importDefault(require("./profile"));
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/machines", machines_1.default);
router.use("/work-orders", workOrders_1.default);
router.use("/parts", parts_1.default);
router.use("/documents", documents_1.default);
router.use("/users", users_1.default);
router.use("/dashboard", dashboard_1.default);
router.use("/search", search_1.default);
router.use("/users", profile_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map