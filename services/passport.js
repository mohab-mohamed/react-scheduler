const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
// const User = mongoose.model("users");

const db = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id).then((user) => {
    done(null, user);
  });
});

console.log(keys);
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      db.User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          existingUser.access = accessToken;
          existingUser.save().then((existingUser) => {
            done(null, existingUser);
          });
        } else {
          new db.User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture,
            todos: [],
            access: accessToken,
            timeTables: [],
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
