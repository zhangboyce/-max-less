'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MenuSchema = new Schema({
      _id: { type: String },
      name: { type: String },
      path: { type: String },
      icon: { type: String },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Menu', MenuSchema, null, { cache: false });
};
