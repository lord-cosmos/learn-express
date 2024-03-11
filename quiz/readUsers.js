const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("This is inside readUser middleware ");
  next();
});

router.get("/", (req, res) => {
  res.send("Welcome to /Read");
});

// service to read all users
router.get("/usernames", (req, res) => {
  let usernames = req.users.map(function (user) {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

// service to read a specific user
router.get("/usernames/:name", (req, res) => {
  const name = req.params.name;
  const user_with_name = req.users.filter(function (user) {
    return user.username === name;
  });
  if (user_with_name.length === 0) {
    return res.status(404).send("User not found");
  } else {
    res.send(user_with_name);
  }
});

module.exports = router;
