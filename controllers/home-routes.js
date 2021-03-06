const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// on app start show homepage with all post using async await
router.get("/", async (req, res) => {
  console.log(req.session);
  // try catch block
  try {
    const dbPostData = await Post.findAll({
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

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// If logged in render user dashboard, else render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// if logged in render homepage, else render signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// get single post with comments
router.get("/post/:id", withAuth, async (req, res) => {
  console.log(req.session);
  // try catch block
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
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
          attributes: ["id", "username"],
        },
      ],
    });
    // if not post data with id return error
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const posts = dbPostData.get({ plain: true });
    res.render("singlepost", {
      posts,
      currentUser: req.session.user_id,
      loggedIn: req.session.loggedIn,
    });
    console.log({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  console.log(req.session);
  // try catch block
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
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
          attributes: ["id", "username"],
        },
      ],
    });
    // if not post data with id return error
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const posts = dbPostData.get({ plain: true });
    res.render("single-post", {
      posts,
      currentUser: req.session.user_id,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
