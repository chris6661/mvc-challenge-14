const {
    User
} = require('../models');

const userData = [{
        username: 'JJFrankieJJ',
        password: 'hockey'

    },
    {
        username: 'Shoresy',
        password: 'newfies'
    },
    {
        username: 'Riley',
        password: 'brodudeclubferda'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;