'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PermissionSchema = new Schema({
      _id: { type: String },
      userId: { type: String },
      shopId: { type: String },
      roleId: { type: String },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Permission', PermissionSchema, null, { cache: false });
};
