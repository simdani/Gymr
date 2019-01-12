"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const userRoles_1 = require("../enums/userRoles");
const schema = new mongoose_1.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: userRoles_1.USER_ROLES.USER,
        required: true
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
});
schema.static("findUser", (email) => {
    return exports.User.findOne({ email }).exec();
});
schema.static("saveUser", (user) => {
    return user.save();
});
exports.User = mongoose_2.default.model("User", schema);
//# sourceMappingURL=User.js.map