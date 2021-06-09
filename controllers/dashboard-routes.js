const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');

// GET route /dashboard - use withAuth to check for session. If session exists continue function. 
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at'
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
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', {
                posts,
                loggedIn: true,
                user: {
                    username: req.session.username
                }
            });
            console.log(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET route for post edit /edit/:id
router.get('/edit/:id', withAuth, (req, res) => {
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

            res.render('edit-post', {
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