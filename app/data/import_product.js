module.exports = async (dbName, db, _83Db) => {
    const products = await db.collection('products').find({}).toArray();
    for (let i=0; i<products.length; i++) {
        const _dbId = dbName + '_id';
        const p = products[i];
        const code = p.SAPCode;
        const campaigns = p.campaigns;
        const specialPrice = campaigns && campaigns.specialPrice;
        const salePrice = specialPrice && specialPrice.price;

        let product = await _83Db.collection('commodities').findOne({ code: code });
        if (product) {
            await _83Db.collection('commodities')
                .update( { _id: product._id },
                    { $addToSet: { [_dbId]: p._id },
                        $set: { price: p.price, salePrice: salePrice } });

            console.log('update project %s', product._id);
        } else {
            const volume = p.params.volume + 'ml';
            product = {
                [_dbId]: [p._id],
                categories:  ["1","1_1"],
                name: p.title,
                brand: p.brand,
                price: p.price,
                salePrice: salePrice,
                code: p.SAPCode,
                specs: [{"key" : "容量", "value" : volume} ],
                status: p.status,
                image: p.cover,
                tags: [],
                orderIndex: p.orderIndex,
                _isDeleted: false
            };

            await _83Db.collection('commodities').insert(product);
            console.log('insert project %s', code)
        }
    }
};