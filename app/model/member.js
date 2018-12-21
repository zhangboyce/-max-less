'use strict';

/**
 * 会员
 * @param {EggApplication} app
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MemberSchema = new Schema({
    openid: { type: String },
    nickname: { type: String },
    sex: { type: String },
    phone: { type: String },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    createDate: { type: Date, default: Date.now },
    _isDeleted: { type: Boolean, default: false },
  });

  const Member = mongoose.model('Member', MemberSchema, null, { cache: false });
  MemberSchema.methods.query = {
    List: {
      plurality: true,
      handler: () => {
        return Member.find({ _isDeleted: false });
      },
    },
    Pagination: {
      handler: async (_, { index, size }) => {
        const total = await Member.count({ _isDeleted: false });
        const pagination = {
          total,
          pages: Math.ceil(total / size),
          index,
          size,
          items: await Member.find({ _isDeleted: false }).limit(size).skip((index - 1) * size),
        };
        return pagination;
      },
    },
  };
  return Member;
};
