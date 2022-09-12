const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({body, user_id: req.session.user_id});
      res.status(200).json(postData);
    }
    catch (err) {
    res.status(400).json(err);
  }
});

// router.put( => {}) 

// router.delete( => {})
