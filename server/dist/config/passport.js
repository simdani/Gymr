"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/user/User");
exports.default = (app) => {
    app.use(passport_1.default.initialize());
    const opts = {
        jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "super-secret"
    };
    passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
        User_1.User.findById(jwtPayload.id)
            .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(err => console.log(err));
    }));
};
//# sourceMappingURL=passport.js.map