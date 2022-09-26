const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment, 
          include: [User]
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('posts', {post});
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const postData = await Post.findAll({
//       where : {
//         user_id: req.session.user_id,
//       }
//     });

//     const posts = postData.map((post) => post.get({ plain: true }));
//     res.render('profile', {
//       posts,
//     });
//   } catch (err) {
//     res.redirect('login');
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  
  res.render('login');
});

module.exports = router;
