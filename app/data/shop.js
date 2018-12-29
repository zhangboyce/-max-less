let shops = [
    {
        _id: 'shanghai_01',
        name: "上海门店",
        phone: "13000000000",
        country: "中国",
        province: "上海市",
        city: "上海市",
        address:""
    },
    {
        _id: 'nanjing_01',
        name: "南京门店",
        phone: "13000000000",
        country: "中国",
        province: "江苏省",
        city: "南京市",
        address:""
    },
    {
        _id: 'hangzhou_01',
        name: "杭州门店",
        phone: "13000000000",
        country: "中国",
        province: "浙江省",
        city: "杭州市",
        address:""
    },
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'shop')(shops);
};