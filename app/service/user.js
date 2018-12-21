'use strict';
const bcrypt = require('bcryptjs');
const Service = require('egg').Service;
const SALT_ROUNDS = 10;

class UserService extends Service {
  async login({ username, password }) {
    const user = await this.ctx.model.User.findOne({ username: username });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        user.password = '********';
        return user;
      }
    }
    return null;
  }

  async register({ username, password }) {
    if (!username || !password || !username.trim() || !password.trim()) {
      return { status: false, msg: '用户名和密码不能为空。' };
    }

    const user = await this.ctx.model.User.findOne({ username: username });
    if (user) {
        return { status: false, msg: '该用户名已经被注册，请换一个独一无二的。' };
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    this.ctx.model.User.create({ username, password: hash });
    return { status: true }
  }
}

module.exports = UserService;
