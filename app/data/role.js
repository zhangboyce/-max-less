let roles = [
    {
        _id: "admin",
        name: "超级管理员"
    },
    {
        _id: "shop_manager",
        name: "店铺管理员"
    },
    {
        _id: "shop_salesman",
        name: "店铺销售人员"
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'role')(roles);
};