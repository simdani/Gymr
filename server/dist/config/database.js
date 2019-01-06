"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
mongoose_1.default.connect("mongodb://testas:testas123@ds135952.mlab.com:35952/gymr-dev", { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));
//# sourceMappingURL=database.js.map