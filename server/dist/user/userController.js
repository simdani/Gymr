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
const typedi_1 = require("typedi");
const passport = require("passport");
const userProvider_1 = __importDefault(require("./userProvider"));
let UserController = class UserController {
    constructor(userProvider) {
        this.userProvider = userProvider;
    }
    oauthGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userProvider.loginGoogle(req);
                return res.status(200).json(result);
            }
            catch (e) {
                return res.status(501).json("Error when loggin in with google");
            }
        });
    }
    // 
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userProvider.loginUser(req);
                if (result) {
                    return res.status(200).json(result);
                }
                else {
                    return res.status(400).json("user does not exist");
                }
            }
            catch (e) {
                return res.status(400).json("wrong password");
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userProvider.createUser(req);
                if (result) {
                    return res.status(200).json(result);
                }
                else {
                    return res.status(400).json("already exists");
                }
            }
            catch (e) {
                return res.status(400).json("Error creating new user");
            }
        });
    }
};
__decorate([
    routing_controllers_1.Post("/oauth/google"),
    routing_controllers_1.UseBefore(passport.authenticate("googleToken", { session: false })),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "oauthGoogle", null);
__decorate([
    routing_controllers_1.Post("/login"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    routing_controllers_1.Post("/register"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
UserController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController("/users"),
    __metadata("design:paramtypes", [userProvider_1.default])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map