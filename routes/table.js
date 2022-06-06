const router = require("express").Router()
const User = require("../models/User");

const { verifyUser } = require("./verifyRoles");

router.get("/all" , verifyUser,async(req,res)=>{
    const query = req.query.new;
    try {
      const response = query
        ? await User.find().exclude("password")
        : await User.find();

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
})

module.exports = router;