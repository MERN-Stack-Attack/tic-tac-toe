const User = require('../models/user');
const jwt = require('jwt-simple');

//function to generate viable JWT
const getToken = function(payload) {
  const token = jwt.encode({ username: payload.username }, process.env.SECRET);
  return token;
};

//local sign up middelware ie. Username & password & email(not req)
exports.signup = function(req, res, next) {
  const { username, password, email } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: 'must provide a username & password' });
  }

  User.findOne({ username: username.toLowerCase() }, function(err, exists) {
    console.log('findOne', err, exists); //todo
    if (err) {
      return next(err);
    }
    if (exists) {
      console.log('error: USER EXISTS'); //todo
      res.status(422);
      return res.send({ error: 'Username in use' });
    }

    const newUser = new User({
      username: username,
      password: password,
      email: email,
    });

    newUser.save(function(err, user) {
      if (err) {
        return next(err);
      }
      const userInfo = {
        username: user.username,
        email: user.email,
      };
      res.json({ success: true, token: getToken(newUser), user: userInfo });
    });
  });
};
