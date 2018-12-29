'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
    async login() {
        await this.ctx.render('login.html');
    }

    async register() {
        const { username, password } = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.user.register({ username, password });
    }

    async logout() {
      this.ctx.logout();
      this.ctx.redirect('/login');
    }
}

module.exports = HomeController;
