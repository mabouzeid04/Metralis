"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgent = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const app = (0, app_1.createApp)();
const createAgent = () => (0, supertest_1.default)(app);
exports.createAgent = createAgent;
//# sourceMappingURL=testServer.js.map