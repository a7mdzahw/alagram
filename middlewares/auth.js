const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) return res.status(403).send("Please Provide Token");
  try {
    const user = jwt.verify(token, "3665");
    req.user = user;
    next();
  } catch (ex) {
    return res.status(403).send("Invalid Token");
  }
};
