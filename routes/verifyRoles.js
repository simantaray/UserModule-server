//admin role verify
const JWT = require("jsonwebtoken");
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.PASSTOKEN, (err, user) => {
      if (err) res.status(403).json({status:"Token is not valid!"});
      if (user.role.includes("admin")) next();
      else  return res.status(401).json({status: "Not Authorized only Admin can add roles"});
    });
  } else {
    return res.status(401).json({status: "New User"});
  }
};
const verifyTeamLeader = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.PASSTOKEN, (err, user) => {
      if (err) res.status(403).json({status:"Token is not valid!"});
      if (user.role.includes("teamleader")) next();
      else  return res.status(401).json({status: "Not Authorized only Admin can add roles"});
    });
  } else {
    return res.status(401).json({status: "New User"});
  }
};

module.exports = {
  verifyAdmin,
  verifyTeamLeader,
};
