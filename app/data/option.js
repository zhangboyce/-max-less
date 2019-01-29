let options = [
    {
        _id: 'sex',
        options: ['男', '女']
    },
    {
        _id: 'channel',
        options: ["大众点评", "百度", "知乎", "豆瓣", "小红书", "论坛", "朋友介绍", "其他"]
    },
    {
        _id: 'lensBrand',
        options: ["蔡司", "依视路", "豪雅", "国产", "其他"]
    },
    {
        _id: 'lensDesc',
        options: ["描述1", "描述2"]
    },
    {
        _id: 'lensFunc',
        options: ["单光", "防蓝光", "变色", "驾驶片"]
    },
    {
        _id: 'lensRefractivity',
        options: ["1.56", "1.60", "1.67", "1.74", "其他"]
    },
    {
        _id: 'payType',
        options: ["支付宝", "微信", "刷卡", "现金"]
    },
    {
        _id: 'orderStatus',
        options: ["配镜成功", "配镜失败"]
    },
    {
        _id: 'revisitStatus',
        options: ["待回访", "已回访"]
    },
    {
        _id: 'weather',
        options: ["晴", "晴转多云", "多云", "阴", "小雨", "阵雨", "中雨", "大雨", "大到暴雨", "雷阵雨", "雨夹雪", "小雪", "中雪", "大到暴雪", "冰雹", "霜冻", "雾"]
    },
    {
        _id: 'weather_windDirection',
        options: ["东风", "南风", "西风", "北风", "东北风", "东南风", "西南风", "西北风"]
    },
    {
        _id: 'weather_windPower',
        options: ["微风", "3-4级风", "4-5级风", "5-6级风", "6-7级风", "7-8级风", "8-9级风", "9-10级风", "暴风", "台风", "超强台风"]
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'option')(options);
};