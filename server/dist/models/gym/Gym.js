"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_1 = require("../../config/database");
const schema = new mongoose_1.Schema({
    name: String,
    city: String,
    description: String
});
schema.static("findAll", () => {
    return exports.Gym.find().exec();
});
exports.Gym = database_1.mongoose.model("Gym", schema);
//# sourceMappingURL=Gym.js.map