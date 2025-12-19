"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = void 0;
const jwt_1 = require("../../utils/jwt");
const testDb_1 = require("./testDb");
const getUserToken = async (role = "TECHNICIAN") => {
    const user = await testDb_1.prisma.user.findFirstOrThrow({
        where: { role },
    });
    return (0, jwt_1.signToken)({
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
    });
};
exports.getUserToken = getUserToken;
//# sourceMappingURL=auth.js.map