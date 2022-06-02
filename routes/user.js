const router = require("express").Router();
const User   = require("../models/User");
const { verifyRoles } = require("./verifyRoles");


router.post("/register",async(req,res)=>{
    const newUser=new User({
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password,
        roles    : req.body.roles
    });
    console.log(newUser)
    try{
        const response=await newUser.save();
        res.status(201).json(response);
        
    }catch(e){
        res.status(500).json(e);
    }
})

router.post("/login", async(req,res)=>{
    try {
        const response = await User.findOne({username:req.body.username});
        if(!response){
            res.status(401).json("u r not a user")
        }else{

            if(response.password !==req.body.password){
                res.status(401).json("wrong password");
            }else{
                const {password, roles,...rest}=response._doc;
                res.status(200).json(roles);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//edit
router.put("/:id",verifyRoles,async(req,res)=>{
    console.log(req.userRole)
    try {
        const response = await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        if(!response){
          res.status(401).json("no user found")
        }else{
          res.status(200).json(response);
        }
    } catch (error) {
        res.status(500);
    }
})
//add  new roles
router.post("/addrole/:role/:id",verifyRoles, async (req, res) => {
    try {
      const response = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { roles: { $each: [ req.params.role ] } } },
        { new: true }
      );
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports =router;