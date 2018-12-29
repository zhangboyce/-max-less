let menus = [
    {
        _id: "Dashboard",
        name: "Dashboard",
        path: "/dashboard",
        icon: "tim-icons icon-chart-pie-36",
    },
    {
        _id: "shop_manage",
        name: "店铺管理",
        path: "/shop_manage",
        icon: "tim-icons icon-bank",
    },
    {
        _id: "user_manage",
        name: "人员管理",
        path: "/user_manage",
        icon: "tim-icons icon-single-02",
    },
    {
        _id: "order_manage",
        name: "订单管理",
        path: "/order_manage",
        icon: "tim-icons icon-single-copy-04",
    },
    {
        _id: "stat_manage",
        name: "每日统计",
        path: "/stat_manage",
        icon: "tim-icons icon-chart-bar-32",
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'menu')(menus);
};