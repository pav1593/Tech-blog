const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//-------------------get all the recipes with userdata----------------------
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Comment },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      style: 'index.css',
    });
    //res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post },{model:Comment}],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});


//----------------login routes--------------------
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
