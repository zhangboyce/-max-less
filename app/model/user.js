'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
      _id: { type: String },
      username: { type: String },
      password: { type: String },
      phone: { type: String },
      sex: { type: Number },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('User', UserSchema, null, { cache: false });
};
