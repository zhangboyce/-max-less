'use strict';
const Controller = require('egg').Controller;
const _ = require('lodash');

class MenuController extends Controller {
    async list() {
        const user = this.ctx.user;
        if (this.ctx.helper.isAdmin(user)) {
            const roleMenu = await this.ctx.model.RoleMenu.findOne({ _id: 'admin' });
            const menus = await this.ctx.model.Menu.find({ _id: { $in: roleMenu.menus } });
            this.ctx.body = { status: true, data: menus };
        } else {
            const shopId = this.ctx.query.shopId;
            if (!shopId) {
                this.ctx.body = { status: true, data: [] };
                return;
            }

            const permissions = await this.ctx.model.Permission.find({ userId: user._id, shopId });
            const roleIds = permissions.map(it => it.roleId);
            const roleMenus = await this.ctx.model.RoleMenu.find({ _id: { $in: roleIds } });
            const menuIds = _.flatten(roleMenus.map(it => it.menus));

            const menus = await this.ctx.model.Menu.find({ _id: { $in: menuIds } });
            this.ctx.body = { status: true, data: menus };
        }

    }
}

module.exports = MenuController;
