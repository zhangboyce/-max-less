'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    phone: { type: String },
    createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('User', UserSchema, null, { cache: false });
};
