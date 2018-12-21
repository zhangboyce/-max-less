'use strict';
const Strategy = require('passport-local').Strategy;

module.exports = app => {
  app.passport.use('local', new Strategy({
    passReqToCallback: true,
  }, function(req, username, password, done) {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));

  app.passport.verify(async (ctx, user) => {
    if (user.provider === 'local') {
      return await ctx.service.user.login(user);
    }
    return user;
  });

  app.passport.serializeUser(function* (ctx, user) {
    user.currentUrl = ctx.url;
    if (user.role !== 1) {
      ctx.session.returnTo = '/';
    }
    return user;
  });

  app.passport.deserializeUser(function* (ctx, user) {
    user.lastUrl = user.currentUrl;
    user.currentUrl = ctx.url;
    return user;
  });
};
