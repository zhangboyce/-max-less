'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');

class StatController extends Controller {
    async get() {
        let shopId = this.ctx.query.shopId;
        let dateStr = this.ctx.query.date;
        let minDate = new Date(dateStr + ' 00:00:00');
        let maxDate = new Date(dateStr + ' 23:59:59');

        let stat = await this.ctx.model.Stat.findOne({ shopId, date: dateStr });
        stat = (stat && stat.toObject() || {});

        let orders = await this.ctx.model.Order
            .find({ shopId: shopId, orderTime: { $gte: minDate, $lte: maxDate } })
            .sort({ orderTime: 1 });

        if (orders.length === 0) {
            stat = Object.assign({}, stat, {
                date: moment(minDate).format('YYYY-MM-DD'),
                salesVolume: 0,
                salesNumber: 0,
                firstOrderTime: "",
                lastOrderTime: "",
            })
        } else {
            let salesNumber = orders.length;
            let salesVolume = orders.map( it => it.price).reduce((a, b) => (a + b), 0);
            let firstOrderTime = orders[0].orderTime;
            let lastOrderTime = orders[orders.length - 1].orderTime;

            stat = Object.assign({}, stat, {
                date: moment(firstOrderTime).format('YYYY-MM-DD'),
                salesVolume,
                salesNumber,
                firstOrderTime: moment(firstOrderTime).format('YYYY-MM-DD HH:mm:ss'),
                lastOrderTime: moment(lastOrderTime).format('YYYY-MM-DD HH:mm:ss'),
            })
        }

        this.ctx.body = { status: true, result: stat }
    }

    async save() {
        let stat = this.ctx.request.body.stat;
        let shopId = this.ctx.request.body.shopId;

        if (!stat) {
            this.ctx.body = { status: false, msg: 'no stat object.' };
            return;
        }
        if (!shopId) {
            this.ctx.body = { status: false, msg: 'no shopId.' };
            return;
        }

        stat.shopId = shopId;
        let statObj = new this.ctx.model.Stat(stat);
        statObj.save();

        this.ctx.body = { status: true, result: statObj._id }
    }

    async update() {
        let stat = this.ctx.request.body.stat;
        if (!stat || !stat._id) {
            this.ctx.body = { status: false, msg: 'no stat object or stat._id.' };
            return;
        }

        await this.ctx.model.Stat.update({ _id: stat._id }, { $set: stat });
        this.ctx.body = { status: true }
    }

    async list() {
        let shopId = this.ctx.query.shopId;
        let index = parseInt(this.ctx.query.index) || 1;
        let size = parseInt(this.ctx.query.size) || 31;

        let date = moment().format('YYYY-MM-DD').split('-');
        let dates = Array(31).fill().map((_, i) => ([date[0],date[1],(i+1 < 10) ? ('0' + (i+1)) : i+1 ].join('-')));

        let query = { shopId, date: { $in: dates }};
        const total = await this.ctx.model.Stat.count(query);

        let skip = (index - 1) * size;
        let stats = await this.ctx.model.Stat.find(query).skip(skip).limit(size).sort({ date: -1 });
        stats = stats.map(stat => {
            stat = stat.toObject();
            stat.firstOrderTime = stat.firstOrderTime ? moment(stat.firstOrderTime).format('YYYY-MM-DD HH:mm:ss') : '';
            stat.lastOrderTime = stat.lastOrderTime ? moment(stat.lastOrderTime).format('YYYY-MM-DD HH:mm:ss'): '';
            stat.date = moment(stat.date).format('YYYY-MM-DD');

            return stat;
        });

        this.ctx.body = { status: true, result: { total, list: stats } };
    }
}

module.exports = StatController;
