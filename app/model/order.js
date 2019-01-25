'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OrderSchema = new Schema({
      shopId: { type: String },
      orderStatus: { type: String }, // 订单状态
      consumerId: { type: String }, // 客户信息
      serviceUserId: { type: String }, // 服务人员
      address: { type: String }, // 邮寄地址
      revisitStatus: { type: String }, // 回访状态
      price: { type: Number }, // 订单金额
      payType: { type: String }, // 支付方式
      orderTime: { type: Date }, // 下单时间
      lensBrand: { type: String }, // 镜片品牌
      lensDesc: { type: String }, // 镜片描述
      lensFunc: { type: String }, // 镜片功能
      lensRefractivity: { type: String }, // 镜片折射率
      glassesFrame: { type: String }, // 镜架
      leftMyopiaDegree: { type: String }, // 左眼近视度数
      rightMyopiaDegree: { type: String }, // 右眼近视度数
      leftAstigmatismDegree: { type: String }, // 左眼散光度数
      rightAstigmatismDegree: { type: String }, // 右眼散光度数
      leftAstigmatismAxis: { type: String }, // 左眼散光轴位
      rightAstigmatismAxis: { type: String }, // 右眼散光轴位
      pupilDistance: { type: String }, // 瞳距
      frameAndCleadingWeight: { type: String }, // 镜框和衬板的重量
      cleadingWeight: { type: String }, // 衬板的重量
      glassesWeight: { type: String }, // 眼镜的重量
      isDeleted: { type: Boolean, default: false },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Order', OrderSchema, null, { cache: false });
};
