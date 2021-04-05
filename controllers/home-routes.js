const router = require('express').Router();
const { User, Comments, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/profile', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  try {
    const user = await User.findByPk(req.session.user_id, {include: "posts"});
    res.render('profile', {
      user: user.toJSON(),
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', async (req, res) =>{
  res.render('signup', {
    logged_in: req.session.logged_in,
  })
});

router.get('/profile/:id', async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id);
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const users = usersData.get({ plain: true });
      res.render('profile', users);
    } catch (err) {
        res.status(500).json(err);
    };     
});
module.exports = router;