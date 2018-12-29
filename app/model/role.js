'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleSchema = new Schema({
      _id: { type: String },
      name: { type: String },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Role', RoleSchema, null, { cache: false });
};
