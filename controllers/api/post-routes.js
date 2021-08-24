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

// Delete post route by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post route by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
