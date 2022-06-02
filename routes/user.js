const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { verifyAdmin } = require("./verifyRoles");

router.post("/register", async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  // console.log(bcrypt.compareSync('Pa$$w0rd', "$2a$10$uRMuqwJergg.c5okh.hHWOTkYkXaQBrDOQQdjPCiot.0qnlljBb/W"))

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  });
  res.json(newUser);

  //   console.log(newUser);
  //   try {
  //     const response = await newUser.save();
  //     res.status(201).json(response);
  //   } catch (e) {
  //     res.status(500).json(e);
  //   }
});

router.post("/login", async (req, res) => {
  try {
    const response = await User.findOne({ username: req.body.username });
    if (!response) {
      res.status(401).json("u r not a user");
    } else {
      if (response.password !== req.body.password) {
        res.status(401).json("wrong password");
      } else {
        const { password, roles, ...rest } = response._doc;
        res.status(200).json(roles);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit
router.put("/:id", verifyAdmin, async (req, res) => {
  console.log(req.userRole);
  try {
    const response = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!response) {
      res.status(401).json("no user found");
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500);
  }
});
//add  new role
router.post("/addrole/:role/:id", verifyAdmin, async (req, res) => {
  try {
    const response = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { roles: { $each: [req.params.role] } } },
      { new: true }
    );
    if (response) res.status(200).json({ status: "role added" });
  } catch (err) {
    res.status(500).json(err);
  }
});
//remove role
router.post("/removerole/:role/:id", verifyAdmin, async (req, res) => {
  try {
    const response = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { roles: req.params.role } },
      { new: true }
    );
    if (response) res.status(200).json({ status: "role Removed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
