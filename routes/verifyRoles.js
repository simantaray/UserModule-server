//admin role verify
const JWT = require("jsonwebtoken");
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.PASSTOKEN, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      if (user.role.includes("admin")) next();
    });
  } else {
    return res.status(401).json("u dont have any role");
  }
};
const verifyTeamLeader = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.PASSTOKEN, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      if (user.role.includes("teamleader")) next();
    });
  } else {
    return res.status(401).json("u dont have any role");
  }
};

module.exports = {
  verifyAdmin,
  verifyTeamLeader,
};
