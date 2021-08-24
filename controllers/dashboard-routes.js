const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all posts by logged in user
router.get("/", withAuth, async (req, res) => {
  console.log(req.session);
  // try catch block
  try {
    const dbPostData = await Post.findAll({
      where: {
        id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    let username = req.session.username;
    username = username[0].toUpperCase() + username.slice(1).toLowerCase();

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // render template and pass in db data
    res.render("dashboard", {
      posts,
      username: username,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get new post form
router.get("/new-form", (req, res) => {
  res.render("newpost");
});
