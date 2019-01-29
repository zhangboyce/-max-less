'use strict';
const Controller = require('egg').Controller;

class OptionController extends Controller {
    async list() {
        let options = await this.ctx.model.Option.find({});
        options = options.map(op => {
           op.options = op.options.map(it => ({ name: it, value: it }));
           return op;
        });

        const user = this.ctx.user;
        let serviceUsers = [user];
        if (this.ctx.helper.isAdmin(user)) {
            const shopId = this.ctx.query.shopId;
            if (shopId) {
                const permissions = await this.ctx.model.Permission.find({ shopId });
                const userIds = permissions.map(it => it.userId);
                serviceUsers = await this.ctx.model.User.find({ _id: { $in: userIds } });
            }
        }

        serviceUsers = serviceUsers.map(it => ({ name: it.username, value: it._id }));
        options.push({ _id: "serviceUserId", options: serviceUsers })

        let data = options.reduce((a, c) => {
            a[c._id] = c.options;
            return a;
        } , {});

        this.ctx.body = { status: true, data }
    }

    async user() {
        const user = this.ctx.user;
        let result = {};
        if (this.ctx.helper.isAdmin(user)) {
            let shops = await this.ctx.model.Shop.find({});
            shops = shops.map(shop => ({
                name: shop.name,
                value: shop._id
            }));

            let roles = await this.ctx.model.Role.find({});
            roles = roles.filter(role => role._id !== 'admin');
            roles = roles.map(role => ({
                name: role.name,
                value: role._id
            }));

            result.shops = shops;
            result.roles = roles;
        }

        this.ctx.body = { status: true, result };
    }
}

module.exports = OptionController;
