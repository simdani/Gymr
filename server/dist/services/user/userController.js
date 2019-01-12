"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
// import UserProvider from "./userProvider";
const typedi_1 = require("typedi");
const User_1 = require("../../models/user/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserController = class UserController {
    constructor() { }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const user = yield User_1.User.findOne({ email });
            if (!user) {
                return res.status(400).json("user not found");
            }
            else {
                const checkPassword = yield bcrypt_1.default.compare(password, user.password);
                if (checkPassword) {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    };
                    const token = jsonwebtoken_1.default.sign(payload, "super-secret", { expiresIn: 3600 });
                    return res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
                else {
                    return res.status(400).json("wrong password");
                }
            }
            // const allGymsResponse = await this.userProvider.login();
            // return response.json(allGymsResponse);
        });
    }
};
__decorate([
    routing_controllers_1.Post("/login"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map