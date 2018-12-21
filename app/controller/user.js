'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class HomeController extends Controller {
  async login() {
    const { app } = this.ctx;
    const file = path.resolve(app.baseDir, 'app/web/public/views/login.html');
    this.ctx.set('Content-Type', 'text/html');
    this.ctx.body = await fs.readFileSync(file);
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
