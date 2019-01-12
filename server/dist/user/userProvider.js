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
const typedi_1 = require("typedi");
const signToken_1 = require("../utils/signToken");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserProvider = class UserProvider {
    constructor() { }
    loginGoogle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role
            };
            const token = signToken_1.signToken(payload);
            const result = {
                success: true,
                token: "Bearer " + token
            };
            return result;
        });
    }
    createUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const user = yield User_1.User.findOne({ email: email });
            if (user) {
                return null;
            }
            const newUser = new User_1.User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(newUser.password, salt);
            newUser.password = hash;
            const createUser = yield newUser.save();
            return createUser;
        });
    }
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const user = yield User_1.User.findOne({ email: email });
            if (!user) {
                return null;
            }
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                const payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                const token = jsonwebtoken_1.default.sign(payload, "super-secret", { expiresIn: 3600 });
                const result = {
                    success: true,
                    token: "Bearer " + token
                };
                return result;
            }
        });
    }
};
UserProvider = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], UserProvider);
exports.default = UserProvider;
//# sourceMappingURL=userProvider.js.map