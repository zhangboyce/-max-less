'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/login', controller.user.login);
    router.get('/logout', controller.user.logout);
    router.post('/xauth/login', app.passport.authenticate('local'));

    router.post('/api/admin/register', controller.user.register);
    router.get('/api/shop/list', controller.shop.list);
    router.get('/api/menu/list', controller.menu.list);
    router.get('/api/option/list', controller.option.list);

    router.post('/api/order/save', controller.order.save);

    router.get('/*', controller.home.index);
};
