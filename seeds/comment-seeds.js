const {
    Comment
} = require('../models');

const commentData = [{
        comment_text: "A woodchuck would chuck all the wood if a woodchuck could chuck wood.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Pitter patter, let's get at 'er",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "No praccy, no game buddy",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;