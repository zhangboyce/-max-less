const objectID = require('mongodb').ObjectID;
module.exports = async (dbName, db, _83Db) => {
    const bizorders = await db.collection('bizorders').find({ }).toArray();

    const members = await _83Db.collection('members').find({}).toArray();
    const _members_ = members.reduce((rv, x) => {
        rv[x['openid']] = x['_id'];
        return rv;
    }, {});

    const dbId = dbName + '_id';
    const products = await _83Db.collection('commodities').find({ [dbId]: { $exists: true } }).toArray();
    const _products_ = products.reduce((rv, x) => {
        const dbIds = x[dbId];
        dbIds.forEach(it => {
            rv[it] = x['_id'];
        });
        return rv;
    }, {});

    const equipmentMap = {
        'eternal': '5ba077201bf56733824336de',
        'eternal-0820': '5ba077201bf56733824336e1',
        'eternal0919': '5ba077201bf56733824336e4'
    };

    for (let i=0; i<bizorders.length; i++) {
        const bizorder = bizorders[i];

        const _id = bizorder._id;
        const openid = bizorder.openid;

        const member = _members_[openid];
        const commodity = [_products_[bizorder.productId]];
        const equipment = objectID(equipmentMap[dbName]);
        const type = bizorder.type;
        const createDate = bizorder.dateCreated;
        const salePrice = bizorder.price;
        const status = bizorder.done || 0;
        const _isDeleted = false;

        const order = {
            _id,
            member,
            commodity,
            equipment,
            type,
            createDate,
            salePrice,
            status,
            _isDeleted
        };
        await _83Db.collection('orders').update({ _id }, { $set: order }, { upsert: true });
        console.log(order)
    }
};