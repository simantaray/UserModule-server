//admin role verify
const verifyAdmin = (req, res, next) => {
  const roleHeader = req.headers.role;
  if (roleHeader) {
    if (roleHeader == "admin") {
      req.userRole = "admin";
      next();
    } else {
      return res.status(401).json("u are not admin");
    }
  } else {
    return res.status(401).json("u dont have any role");
  }
};
const verifyTeamLeader = (req, res, next) => {
    const roleHeader = req.headers.role;
    if (roleHeader) {
      if (roleHeader == "teamleader") {
        req.userRole = "teamleader";
        next();
      } else {
        return res.status(401).json("u are not teamleader");
      }
    } else {
      return res.status(401).json("u dont have any role");
    }
  };

module.exports = {
    verifyAdmin , verifyTeamLeader
};
