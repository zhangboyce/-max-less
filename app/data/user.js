let users = [{
        _id: 'admin',
        username: 'admin',
        password: '$2a$10$15hL8UL.0toQxZUxVBRSFups1FKAxS0DgyAg04mPMlZUZKP1j7fSO',
        phone: '15353535353',
        sex: 1,
    }
];

module.exports = async (mongoose) => {
    await require('./common')(mongoose, 'user')(users);
};