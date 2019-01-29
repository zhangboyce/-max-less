'use strict';
const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

class UserController extends Controller {
    async login() {
        await this.ctx.render('login.html');
    }

    async register() {
        const { username, password } = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.user.register({ username, password });
    }

    async delete() {
        const { userId } = this.ctx.request.body;
        await this.ctx.model.User.remove({ _id: userId });
        await this.ctx.model.Permission.remove({ userId });

        this.ctx.body = { status: true };
    }

    async list() {
        let index = parseInt(this.ctx.query.index) || 1;
        let size = parseInt(this.ctx.query.size) || 10;


        let query = { _id: { $ne: 'admin' } };
        const total = await this.ctx.model.User.count(query);

        let skip = (index - 1) * size;
        let users = await this.ctx.model.User.find(query).skip(skip).limit(size).sort({ createDate: -1 });
        users = await Promise.all(users.map(async user => {
            user = user.toObject();
            let permission = await this.ctx.model.Permission.findOne({ userId: user._id });
            if (permission) {
                let roleId = permission.roleId;
                let shopId = permission.shopId;
                let role = await this.ctx.model.Role.findOne({ _id: roleId });
                let shop = await this.ctx.model.Shop.findOne({ _id: shopId });

                user.roleId = role ? role._id : '';
                user.roleName = role ? role.name : '';

                user.shopId = shop ? shop._id : '';
                user.shopName = shop ? shop.name : '';
            }
            return user;
        }));

        this.ctx.body = { status: true, result: { total, list: users } };
    }

    async save() {
        const { sex, phone, roleId, shopId, username, password } = this.ctx.request.body.user;

        console.log(this.ctx.request.body);

        if (!username || !password || !username.trim() || !password.trim()) {
            this.ctx.body =  { status: false, msg: '用户名和密码不能为空。' };
            return;
        }
        const user = await this.ctx.model.User.findOne({ _id: username });
        if (user) {
            this.ctx.body =  { status: false, msg: '该用户名已经被注册，请换一个独一无二的。' };
            return;
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        new this.ctx.model.User({ _id: username, username, password: hash, sex, phone }).save();

        let permission = new this.ctx.model.Permission({
            _id: [username, shopId, roleId].join('-'),
            userId: username,
            shopId,
            roleId,
        });
        permission.save();

        this.ctx.body = { status: true };

    }

    async update() {
        const { username, password, sex, phone, roleId, shopId } = this.ctx.request.body.user;

        await this.ctx.model.User.remove({ _id: username });
        await this.ctx.model.Permission.remove({ userId: username });

        if (!username || !password || !username.trim() || !password.trim()) {
            this.ctx.body =  { status: false, msg: '用户名和密码不能为空。' };
            return;
        }
        const user = await this.ctx.model.User.findOne({ _id: username });
        if (user) {
            this.ctx.body =  { status: false, msg: '该用户名已经被注册，请换一个独一无二的。' };
            return;
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        new this.ctx.model.User({ _id: username, username, password: hash, sex, phone }).save();

        let permission = new this.ctx.model.Permission({
            _id: [username, shopId, roleId].join('-'),
            userId: username,
            shopId,
            roleId,
        });
        permission.save();

        this.ctx.body = { status: true };
    }

    async logout() {
      this.ctx.logout();
      this.ctx.redirect('/login');
    }
}

module.exports = UserController;
