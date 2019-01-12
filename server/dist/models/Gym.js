"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 50
    },
    city: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 60
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    website: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    likes: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users"
    },
    reviews: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "users"
            },
            username: {
                type: String
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
schema.static("findAll", () => {
    return exports.Gym.find().exec();
});
exports.Gym = mongoose_2.default.model("Gym", schema);
//# sourceMappingURL=Gym.js.map