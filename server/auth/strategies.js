const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//local signin strategy w password
passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log('localstrategy', username); //// TODO:
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        console.log('localstrategy:', err);
        return done(err);
      }
      //no username in the DB
      if (!user) {
        return done(null, false, { message: 'Incorrect username/password.' });
      }
      //validate password using USER method declared in Mongoose model/schema
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect username/password.' });
        }
        return done(null, user);
      });
    });
  })
);
