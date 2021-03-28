const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

route.use('/users', userRoutes);
route.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;