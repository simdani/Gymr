import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";
import { Application } from "express";
import GooglePlusTokenStrategy from "passport-google-plus-token";
import { User } from "../models/User";

export default (app: Application) => {
  app.use(passport.initialize());

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "super-secret"
  };

  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.use(
    "googleToken",
    new GooglePlusTokenStrategy(
      {
        clientID: "203901133016-ac7ijvdt8ri6it94p8m534a51e6gnkpq.apps.googleusercontent.com",
        clientSecret: "zv0R9tFDEGGmMu_4GZl-9Dya"
      },
      async (accessToken: any, refreshToken: any, profile: { id: any; displayName: any; emails: { value: any; }[]; }, done: { (arg0: null, arg1: import("../models/User").IUser): void; (arg0: null, arg1: import("../models/User").IUser): void; (arg0: any, arg1: boolean, arg2: any): void; }) => {
        // fulle user profile
        try {
          const user = await User.findOne({ "google.id": profile.id });
          if (user) {
            return done(null, user);
          }

          const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            google: {
              id: profile.id,
              email: profile.emails[0].value
            }
          });

          await newUser.save();
          done(null, newUser);
        } catch (er) {
          done(er, false, er.message);
        }
      }
    )
  );
};
