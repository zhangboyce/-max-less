'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.path.startsWith('/api')) {
      if (!ctx.isAuthenticated()) {
        ctx.body = { status: false, msg: 'need login' };
        return;
      }
    }
    await next();
  };
};
