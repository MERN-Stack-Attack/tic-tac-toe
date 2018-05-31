const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  email: String,
  auth_type: String, //ie twitter or local etc...
});

userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  //if no password exists, check if local or if social account
  if (!user.password) {
    if (user.type == 'local') {
      return next(new Error('Whoops!, password required for local signup.'));
    }
    return next(); //for social (twitter,google, etc..) login/signup - No Password
  }

  // if local generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
