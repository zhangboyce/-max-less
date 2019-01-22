'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ConsumerSchema = new Schema({
      name: { type: String },
      phone: { type: String },
      sex: { type: String },
      channel: { type: String },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Consumer', ConsumerSchema, null, { cache: false });
};
