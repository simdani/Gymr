"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
exports.checkifAuthenticated = (req, res, next) => {
    console.log('test');
    passport_1.default.authenticate('jwt', { session: false });
    next();
};
//# sourceMappingURL=authentication.js.map