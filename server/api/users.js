const router = require("express").Router();
const { User } = require("../db/model");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email", "firstName", "lastName", "userName"],
      where: { id: req.user.id },
      // the ternary above checks if user is an admin (using isAdmin instance method)
      // returns an empty object so that all users are displayed for Admin
      // returns only current user's account info
    });
    if (user) {
      res.status(200).json(users);
    } else {
      res.status(404).send("Cannot find user");
    }
  } catch (error) {
    next(error);
  }
});
