"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const schema = new mongoose_1.Schema({
    name: String,
    city: String,
    description: String
});
schema.static("findAll", () => {
    return exports.Gym.find().exec();
});
exports.Gym = mongoose_2.default.model("Gym", schema);
//# sourceMappingURL=Gym.js.map