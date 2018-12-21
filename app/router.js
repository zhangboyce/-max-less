'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.get('/logout', controller.user.logout);
  router.post('/xauth/login', app.passport.authenticate('local'));

};
