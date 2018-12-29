'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleMenuSchema = new Schema({
      _id: { type: String },
      menus: { type: Array },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('RoleMenu', RoleMenuSchema, null, { cache: false });
};
