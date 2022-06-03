const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const { verifyAdmin } = require("./verifyRoles");

router.post("/register", async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  //needed to handel duplication of username
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  });
  try {
    const response = await newUser.save();
    const { password, ...rest } = response._doc;
    res.status(201).json({...rest});
  } catch (e) {
    if(e.code=="11000"){
      res.status(400).json({status: "username or email already exist"});
    }
    res.status(500).json(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await User.findOne({ username: req.body.username });
    if (!response) {
      res.status(401).json("u r not a user");
    } else {
      if (!bcrypt.compareSync(req.body.password, response.password)) {
        res.status(401).json("wrong password");
      } else {
        const { password, roles, ...rest } = response._doc;
        const acessToken = JWT.sign(
          {
            id: response.id,
            role: response.roles,
          },
          process.env.PASSTOKEN,
          { expiresIn: "2d" }
        );
        res.status(200).json({ ...rest, acessToken });
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
  let assignRole;
  switch (req.params.role) {
    case "0":
      assignRole = "admin";
      break;
    case "1":
      assignRole = "hr";
      break;
    case "2":
      assignRole = "teamleader";
      break;
    case "3":
      assignRole = "teammember";
      break;
    default:
      assignRole = "notValid";
  }
  if (assignRole != "notValid") {
    try {
      const response = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { roles: { $each: [assignRole] } } },
        { new: true }
      );
      if (response) res.status(200).json({ status: "role added" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.json({ status: "not a valid role" });
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
