import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";
import { Application } from "express";
import { User } from "../models/user/User";

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
};
