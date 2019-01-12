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
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const passport_google_plus_token_1 = __importDefault(require("passport-google-plus-token"));
const User_1 = require("../models/User");
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
    passport_1.default.use("googleToken", new passport_google_plus_token_1.default({
        clientID: "203901133016-ac7ijvdt8ri6it94p8m534a51e6gnkpq.apps.googleusercontent.com",
        clientSecret: "zv0R9tFDEGGmMu_4GZl-9Dya"
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        // fulle user profile
        try {
            const user = yield User_1.User.findOne({ "google.id": profile.id });
            if (user) {
                return done(null, user);
            }
            const newUser = new User_1.User({
                username: profile.displayName,
                email: profile.emails[0].value,
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });
            yield newUser.save();
            done(null, newUser);
        }
        catch (er) {
            done(er, false, er.message);
        }
    })));
};
//# sourceMappingURL=passport.js.map