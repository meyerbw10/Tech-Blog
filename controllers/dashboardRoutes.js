const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where : {
        user_id: req.session.user_id,
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('admin-posts', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post',
  {
    layout: 'dashboard'
  });
})

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });
    res.render('edit', {
      layout: 'dashboard',
      post,
    });
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;