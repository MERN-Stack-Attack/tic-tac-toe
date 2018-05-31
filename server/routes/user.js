module.exports = function(app) {
  //test route
  app.get('/api/user/test', (req, resp) => {
    resp.end('user-route test good!');
  });
};
