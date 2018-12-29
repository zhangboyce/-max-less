let permissions = [
    {
        _id: 'admin',
        userId: 'admin',
        roleId: 'admin',
    },
    {
        _id: 'boyce-nanjing_01-shop_manager',
        userId: 'boyce',
        shopId: 'nanjing_01',
        roleId: 'shop_manager',
    },
    {
        _id: 'boyce-hangzhou_01-shop_salesman',
        userId: 'boyce',
        shopId: 'hangzhou_01',
        roleId: 'shop_salesman',
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'permission')(permissions);
};