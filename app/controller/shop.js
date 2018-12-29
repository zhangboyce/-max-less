'use strict';
const Controller = require('egg').Controller;

class ShopController extends Controller {
    async list() {
        const user = this.ctx.user;
        if (this.ctx.helper.isAdmin(user)) {
            const shops = await this.ctx.model.Shop.find({});
            this.ctx.body = { status: true, data: shops };
        } else {
            const permissions = await this.ctx.model.Permission.find({ userId: user._id });
            const shopIds = permissions.map(it => it.shopId);
            const shops = await this.ctx.model.Shop.find({ _id: { $in: shopIds } });
            this.ctx.body = { status: true, data: shops };
        }

    }
}

module.exports = ShopController;
