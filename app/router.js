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
    router.post('/api/order/update', controller.order.update);
    router.get('/api/order/list', controller.order.list);
    router.post('/api/order/delete', controller.order.delete);
    router.get('/api/order/date/options', controller.order.dateOptions);

    router.get('/*', controller.home.index);
};
