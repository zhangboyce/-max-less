'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    if (!this.ctx.isAuthenticated()) {
      this.ctx.session.returnTo = this.ctx.path;
      this.ctx.redirect('/login');
    } else {
      const host = this.app.config.host;
      const user = this.ctx.user;
      await this.ctx.render('index.html', { host, user });
    }
  }
}

module.exports = HomeController;
