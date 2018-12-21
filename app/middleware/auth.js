'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.path.startsWith('/api')) {
      if (!ctx.isAuthenticated()) {
        ctx.body = { errcode: 1, errmsg: 'need login' };
        return;
      }
    }
    await next();
  };
};
