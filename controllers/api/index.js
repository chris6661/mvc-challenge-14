const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// prefix user-routes with /users path
router.use('/users', userRoutes);
// same for post routes
router.use('/posts', postRoutes);
// comment routes
router.use('/comments', commentRoutes);

module.exports = router;