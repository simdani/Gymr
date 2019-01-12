"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("./config/passport"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const routing_controllers_1 = require("routing-controllers");
const gymController_1 = require("./gym/gymController");
const userController_1 = require("./user/userController");
const typedi_1 = require("typedi");
const mongoose_1 = __importDefault(require("mongoose"));
let app = express_1.default();
routing_controllers_1.useContainer(typedi_1.Container);
mongoose_1.default.connect("mongodb://testas:testas123@ds135952.mlab.com:35952/gymr-dev", { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));
passport_1.default(app);
app.use(cors_1.default({ credentials: true, origin: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(compression_1.default());
routing_controllers_1.useExpressServer(app, {
    routePrefix: '/api',
    controllers: [gymController_1.GymController,
        userController_1.UserController] // we specify controllers we want to use
});
app.listen(5000);
//# sourceMappingURL=server.js.map