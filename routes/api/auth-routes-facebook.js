const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/landing',
      failureRedirect: '/'
    })
  );

  // Middleware to check if the user is authenticated
  // const isUserAuthenticated = (req, res, next) => {
  //   if (req.user) {
  //     next();
  //   } else {
  //     res.send('You must login!');
  //   }
  // };

  // // Secret route
  // app.get('/secret', isUserAuthenticated, (req, res) => {
  //   res.send('You have reached the secret route');
  // });

  // app.get('/api/current_user', (req, res) => {
  //   console.log('fb auth route', req.user);

  //   res.send(req.user);
  // });

  // Logout route
  // app.get('/api/logout', (req, res) => {
  //   req.logout();
  //   req.session = null;
  //   res.clearCookie('userProfile');

  //   res.redirect('/');
  // });
};
