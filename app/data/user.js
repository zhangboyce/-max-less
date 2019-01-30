let users = [{
        _id: 'admin',
        username: 'admin',
        password: '$2a$10$IxED.AP5iP/c2UjyTMb1muFhtf4D1/pNYZvZaAX/7xqcxt3rsaeGa',
        phone: '15353535353',
        sex: 1,
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'user')(users);
};