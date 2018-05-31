const Authenticate = require('../auth/middleware');

module.exports = function(app) {
  //test route
  app.get('/api/user/test', (req, resp) => {
    resp.end('user-route test good!');
  });

  //signup user
  app.post('/api/user/signup', Authenticate.signup);
};
