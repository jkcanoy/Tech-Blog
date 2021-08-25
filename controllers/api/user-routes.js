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
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// create user
router.post("/", async (req, res) => {
  try {
    //check if username already exists
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (dbUserData) {
      console.log("Username already exists");
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
