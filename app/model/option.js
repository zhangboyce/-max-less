'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OptionSchema = new Schema({
      _id: { type: String },
      options: { type: Array },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Option', OptionSchema, null, { cache: false });
};
