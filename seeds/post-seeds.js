const {
    Post
} = require('../models');

const postData = [{
        title: 'The chucker of wood',
        content: 'As of time of wriing, it is unknown how much wood a woodchuck would chuck if a woodchuck could chuck wood.',
        user_id: 1

    },
    {
        title: 'Motivational Phrases',
        content: 'The phrases to start your day with, everyday.',
        user_id: 2
    },
    {
        title: 'Most effective game preparation methods',
        content: 'Is practice the best way to prepare for a game?',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;