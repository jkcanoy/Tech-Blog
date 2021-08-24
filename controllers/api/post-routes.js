const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Create post route
router.post("/", withAuth, async (req, res) => {
  try {
    const dbPostData = Post.create({
      title: req.body.title,
      user_id: req.body.user_id,
      content: req.body.content,
    });
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
