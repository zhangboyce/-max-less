'use strict';
const Controller = require('egg').Controller;

class OrderController extends Controller {
    async save() {
        let order = this.ctx.request.body.order;
        if (!order) {
            this.ctx.body = { status: false, msg: 'no order object.' };
            return;
        }
        let consumerObj = {
            name: order.name,
            phone: order.phone,
            sex: order.sex,
            channel: order.channel,
        };

        let consumer = new this.ctx.model.Consumer(consumerObj);
        consumer.save();

        delete order.name;
        delete order.phone;
        delete order.sex;
        delete order.channel;

        order.consumerId = consumer._id;

        new this.ctx.model.Order(order).save();

        this.ctx.body = { status: true }
    }
}

module.exports = OrderController;
