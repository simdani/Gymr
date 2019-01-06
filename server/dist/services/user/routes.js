"use strict";
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
const User_1 = require("../../models/user/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = [
    {
        path: "/api/v1/users/register",
        method: "post",
        handler: (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json("already exists");
            }
            else {
                const newUser = new User_1.User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(newUser.password, salt);
                newUser.password = hash;
                const createUser = yield newUser.save();
                res.status(201).json(createUser);
                // const salt = await
                // const gyms = await Gym.findAll();
                // res.json(gyms);
            }
        })
    },
    {
        path: "/api/v1/users/login",
        method: "post",
        handler: (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const user = yield User_1.User.findOne({ email });
            if (!user) {
                res.status(400).json("user not found");
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
                    res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
                else {
                    res.status(400).json("wrong password");
                }
            }
        })
    }
];
//# sourceMappingURL=routes.js.map