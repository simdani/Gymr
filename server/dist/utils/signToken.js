"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, "super-secret", { expiresIn: 3600 });
};
//# sourceMappingURL=signToken.js.map