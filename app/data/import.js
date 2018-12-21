const mongoClient = require('mongodb').MongoClient;
(async ()=>{
    const args = process.argv.splice(2);
    const params = args.reduce((a, b) => {
        const bs = b.split('=');
        a[bs[0]] = bs[1];
        return a;
    }, {});

    console.log('args', args);

    const dbs = {
        'eternal': 'mongodb://h1iqeel8fr:tb53xiggb9@dds-bp157759823a37741.mongodb.rds.aliyuncs.com:3717',
        'eternal-0820': 'mongodb://h1iqeel8fr:tb53xiggb9@dds-bp157759823a37741.mongodb.rds.aliyuncs.com:3717',
        'eternal0919': 'mongodb://118.178.228.47:27017'
    };
    const eternal0918 = 'mongodb://192.168.100.83:27017';

    const data = params['data'];
    const dbName = params['db'];
    const mongoUrl = dbs[dbName];
    if (!data || !mongoUrl) {
        console.warn('import data type must be not empty and db must be specified.');
        return;
    }

    const client = await mongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const products = await db.collection('products').find({}).limit(1).toArray();

    const _83Client = await mongoClient.connect(eternal0918);
    const _83Db = _83Client.db('eternal0918');
    const shops = await _83Db.collection('shops').find({}).limit(1).toArray();

    if (products.length != 0 && shops.length != 0) {
        console.log('%s connect ok and 83 connect ok', dbName);
    }

    await require('./import_' + data)(dbName, db, _83Db);

    client.close();
    _83Client.close();
})();