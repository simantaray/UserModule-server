const JWT = require("jsonwebtoken");

const checkExpireJwt= (req,res,next)=>{
     console.log(req.headers)
//    const authHeader = req.headers.token;
// const token = authHeader.split(" ")[1];
//   if (authHeader) {
//     const exp= (JWT.verify(token,  process.env.PASSTOKEN , {ignoreExpiration: true} ).exp)
//     if(Date.now() >=exp* 1000) next()
//     else res.status(300).json({status:"jwt not expired yet"})
//   } else {
//     return res.status(401).json({status: "Not authorize"});
//   }
}

module.exports = {
    checkExpireJwt
  };
  