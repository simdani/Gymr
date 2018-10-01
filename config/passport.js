const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config = require('config');
const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.PASS_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
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
    'googleToken', new GooglePlusTokenStrategy({
      clientID: config.clientID,
      clientSecret: config.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
      // fulle user profile
      try {
        const user = await User.findOne({ 'google.id': profile.id });
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
    })
  );
};
