let members = [
    {
        openid: "oBZiHjgaYduFxCW_zQ4IfrOqfn7Q",
        nickname: "lection",
        sex:"1",
        phone: "13000000000",
        country: "中国",
        province: "上海",
        city: ""
    },
    {
        openid: "oBZiHjjC02XoFkeA0HpIcbi07hz0",
        nickname: "品茗乐",
        sex:"1",
        phone: "13000000000",
        country: "冰岛",
        province: "",
        city: ""
    },
    {
        openid: "oBZiHjjC02XoFkeA0HpIcbi07hz1",
        nickname: "Boyce",
        sex:"1",
        phone: "13000000000",
        country: "中国",
        province: "上海",
        city: ""
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'member')(members);
};