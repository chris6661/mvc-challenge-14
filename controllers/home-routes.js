const sequelize = require('../config/connection');
const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../models');

// GET route to homepage
router.get('/', (req, res) => {
    // log session variables
    //console.log(req.session);
    Post.findAll({
            attributes: [
                'id',
                'title',
                'post_text',
                'created_at'
            ],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => {

            const posts = dbPostData.map(post => post.get({
                plain: true
            }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET route login page
router.get('/login', (req, res) => {
    // if session exists redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // if no session render login page
    res.render('login');
});

// GET route - single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const post = dbPostData.get({
                plain: true
            });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;