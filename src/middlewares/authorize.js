const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token = req.header("x-access-token");
  const jwtOptions = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) {
      return res.status(403).json({ msg: "You need to login first.", err });
    }
    req.userInfo = payload;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  const token = req.header("x-access-token");
  const jwtOptions = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) {
      return res.status(403).json({ msg: "You need to login first.", err });
    }
    const { role_id } = payload;
    if (role_id !== 1)
      return res.status(403).json({ msg: "You need to login as admin.", err });
    req.userInfo = payload;
    next();
  });
};

const authorizeCustomer = (req, res, next) => {
  const token = req.header("x-access-token");
  const jwtOptions = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) return res.status(403).json({ msg: "You need to login first.", err });
    const { role_id } = payload;
    if (role_id !== 2)
      return res.status(403).json({ msg: "You need to login as a customer.", err });
    req.userInfo = payload;
    next();
  });
};

module.exports = { authorize, authorizeAdmin, authorizeCustomer };
