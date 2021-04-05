const {
    User
} = require('../models');

const userData = [{
        id: 1,
        username: 'JJFrankieJJ',
        password: 'hockey'
    },
    {
        id: 2,
        username: 'Shoresy',
        password: 'newfies'
    },
    {
        id: 3,
        username: 'Riley',
        password: 'brodudeclubferda'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;