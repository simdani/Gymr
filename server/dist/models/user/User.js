"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_1 = require("../../config/database");
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
        default: "USER",
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
// schema.static("findAll", () => {
//     return Gym.find().exec();
// });
exports.User = database_1.mongoose.model("User", schema);
//# sourceMappingURL=User.js.map