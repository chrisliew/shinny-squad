const passport = require('passport');

// Routes
module.exports = app => {
  // passport.authenticate middleware is used here to authenticate the request
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile'],
      prompt: 'select_account'
      // Used to specify the required data
    })
  );

  // The middleware receives the data from Google and runs the function on Strategy config
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/secret');
    }
  );

  // Secret route
  // app.get('/secret', isUserAuthenticated, (req, res) => {
  //   res.send('You have reached the secret route');
  // });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  // Logout route
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};