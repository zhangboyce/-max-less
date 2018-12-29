'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.path.startsWith('/api/admin')) {
        if (!ctx.helper.isAdmin(ctx.user)) {
            ctx.body = { status: false, msg: 'no permission.' };
            return;
        }
    }
    await next();
  };
};
