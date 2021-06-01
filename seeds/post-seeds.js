const {
    Post
} = require('../models');

const postData = [
    {
        title: 'The chucker of wood',
        post_url: 'https://woodchucks.com',
        user_id: 2

    },
    {
        title: 'Motivational Phrases',
        post_url: 'https://startthedayoffright.org',
        user_id: 3
    },
    {
        title: 'Most effective game preparation methods',
        post_url: 'hockeyizlyfe.com.ca',
        user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;