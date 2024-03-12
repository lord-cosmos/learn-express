const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.use((req, res, next) => {
  console.log("This is inside writeUser default route middleware");
  next();
});

// default /write route
router.get("/", (req, res) => {
  res.send("Hello Writes");
});

// service to add new users within /write -> route : /write/adduser
router.post("/adduser", (req, res) => {
  let newuser = req.body;
  req.users.push(newuser);
  fs.writeFile(
    path.resolve(__dirname, "./data/users.json"),
    JSON.stringify(req.users),
    (err) => {
      if (err) console.log("Failed to write");
      else console.log("User Saved");
    }
  );
  res.send("done");
});

module.exports = router;
