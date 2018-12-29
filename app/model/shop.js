'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ShopSchema = new Schema({
      _id: { type: String },
      name: { type: String },
      country: { type: String },
      province: { type: String },
      city: { type: String },
      address: { type: String },
      phone: { type: String },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Shop', ShopSchema, null, { cache: false });
};
