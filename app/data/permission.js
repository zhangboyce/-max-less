let permissions = [
    {
        _id: 'admin',
        userId: 'admin',
        roleId: 'admin',
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'permission')(permissions);
};