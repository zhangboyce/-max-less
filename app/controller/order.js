'use strict';
const Controller = require('egg').Controller;

class OrderController extends Controller {
    async save() {
        let order = this.ctx.request.body.order;
        let shopId = this.ctx.request.body.shopId;

        if (!order) {
            this.ctx.body = { status: false, msg: 'no order object.' };
            return;
        }
        if (!shopId) {
            this.ctx.body = { status: false, msg: 'no shopId.' };
            return;
        }
        let consumerObj = {
            name: order.name,
            phone: order.phone,
            sex: order.sex,
            channel: order.channel,
            address: order.address,
            balance: order.balance,
        };

        let consumer = new this.ctx.model.Consumer(consumerObj);
        consumer.save();

        order.consumerId = consumer._id;
        order.shopId = shopId;

        new this.ctx.model.Order(order).save();

        this.ctx.body = { status: true }
    }

    async update() {
        let order = this.ctx.request.body.order;
        if (!order || !order._id) {
            this.ctx.body = { status: false, msg: 'no order object or order._id.' };
            return;
        }

        let consumerId = order.consumerId;
        let consumerObj = {
            name: order.name,
            phone: order.phone,
            sex: order.sex,
            channel: order.channel,
            balance: order.balance,
            address: order.address,
        };
        await this.ctx.model.Consumer.update({ _id: consumerId }, { $set: consumerObj });
        await this.ctx.model.Order.update({ _id: order._id }, { $set: order });

        this.ctx.body = { status: true }
    }

    async list() {
        let shopId = this.ctx.query.shopId;
        let year = this.ctx.query.year;
        let month = this.ctx.query.month;
        let index = parseInt(this.ctx.query.index) || 1;
        let size = parseInt(this.ctx.query.size) || 10;

        let dateGte, dateLte;
        if (year) {
            dateGte = new Date(year + '-1-1 00:00:00');
            dateLte = new Date(year + '-12-31 23:59:59');

            if (month) {
                month = parseInt(month);

                dateGte.setDate(1);
                dateGte.setMonth(month-1);

                let temp = new Date();
                temp.setFullYear(year);
                temp.setMonth(month);
                temp.setDate(0);

                dateLte.setDate(temp.getDate());
                dateLte.setMonth(month-1);
            }
        }

        let query = { shopId, isDeleted: false };
        if (dateGte && dateLte) {
            query.orderTime = { $gte: dateGte, $lte: dateLte };
        }

        const total = await this.ctx.model.Order.count(query);

        let all = await this.ctx.model.Order.find(query);
        let totalPrice = all.map(it => it.price).reduce((a, b) => a + (b ? b : 0), 0);

        let skip = (index - 1) * size;
        let orders = await this.ctx.model.Order.find(query).skip(skip).limit(size).sort({ createDate: -1 });
        orders = await Promise.all(orders.map(async order => {
            order = order.toObject();
            order.consumer = await this.ctx.model.Consumer.findOne({ _id: order.consumerId });
            order.serviceUser = await this.ctx.model.User.findOne({ _id: order.serviceUserId });
            order.shop = await this.ctx.model.Shop.findOne({ _id: shopId });
            return order;
        }));

        this.ctx.body = { status: true, result: { total, totalPrice , list: orders } };
    }

    async delete() {
        const orderId = this.ctx.request.body.orderId;
        await this.ctx.model.Order.update({ _id: orderId }, { $set: { isDeleted: true } });
        this.ctx.body = { status: true };
    }

    async dateOptions() {
        const user = this.ctx.user;
        const shopId = this.ctx.query.shopId;
        let result = {};
        if (this.ctx.helper.isAdmin(user)) {
            let orders = await this.ctx.model.Order.find({ shopId, isDeleted: false }, { orderTime: 1 });
            let orderTimes = orders.map(it => ({
                year: it.orderTime.getFullYear(),
                month: it.orderTime.getMonth() + 1 }));

            orderTimes = orderTimes.reduce((a, c) => {
                (a[c.year] = a[c.year] || []).push(c.month);
                return a;
            }, {});

            Object.keys(orderTimes)
                .sort()
                .forEach(key => {
                    result[key] = orderTimes[key]
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort((a,b) => a - b);
            });
        } else {
            let current = new Date();
            let year = current.getFullYear();
            let month = current.getMonth() + 1;

            result[year] = [month];
        }

        this.ctx.body = { status: true, result }
    }
}

module.exports = OrderController;
