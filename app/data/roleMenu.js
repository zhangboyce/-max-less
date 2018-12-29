let role_menus = [
    {
        _id: "admin",
        menus: [
            'Dashboard',
            'shop_manage',
            'user_manage',
            'order_manage',
            'stat_manage',
        ]
    },
    {
        _id: "shop_manager",
        menus: [
            'order_manage',
        ]
    },
    {
        _id: "shop_salesman",
        menus: [
            'order_manage',
        ]
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'roleMenu')(role_menus);
};