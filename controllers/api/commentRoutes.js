const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({body, user_id: req.session.user_id});
      res.status(200).json(commentData);
    }
    catch (err) {
    res.status(400).json(err);
  }
});

// router.put( => {}) 

// router.delete( => {})
