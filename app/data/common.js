module.exports = (mongoose, name) => {
    return async (data) => {
        let Model = require('../model/' + name)({ mongoose });
        await Promise.all(
            data.map(async it => {
                let model = new Model(it);
                await model.save()
            })
        );
    };
};