const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users');

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'photos'], //This
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        facebookId: profile.id
      });
      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser);
      }
      const existingEmail = await User.findOne({
        email: profile.emails[0].value
      });

      if (existingEmail) {
        const user = await User.update(
          { email: existingEmail.email },
          {
            $set: { facebookId: profile.id }
          },
          err => {
            console.log(err);
          }
        );
        done(null, existingEmail);
      } else if (!existingUser && !existingEmail) {
        // we don't have a user record with this ID, make a new record
        const user = await new User({
          facebookId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        }).save();
        done(null, user);
      }
    }
  )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});
