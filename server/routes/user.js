const Authenticate = require('../auth/middleware');
const passport = require('passport'); //todo
const PassportStrategies = require('../auth/strategies'); //load passport strategies into passport
const authenticateLocal = passport.authenticate('local', { session: false });

module.exports = function(app) {
  //test route
  app.get('/api/user/test', (req, resp) => {
    resp.end('user-route test good!');
  });

  //signup user
  app.post('/api/user/signup', Authenticate.signup);

  //signin user
  app.post('/api/user/signin', authenticateLocal, Authenticate.signin);
};
