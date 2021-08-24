const router = require("express").Router();
const { User } = require("../../models");
const { route } = require("../dashboard-routes");

// User login route
router.post("/login", async (req, res) => {
  try {
    const dbUserData = User.findOne({
      where: {
        name: req.body.username,
      },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.loggedIn = true;
      res.json({ message: "Your are now logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout

// update post route by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.update(
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

    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
