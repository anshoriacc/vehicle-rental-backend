const validateLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!password || !email) {
    return res.status(400).json({ errMsg: "Wrong Input!" });
  }
  next();
};

const validateRegister = (req, res, next) => {
  const {
    body: { name, email, password },
  } = req;
  if (!name || !email || !password) {
    return res.status(400).json({ errMsg: "Wrong Input!" });
  }
  next();
};

module.exports = { validateLogin, validateRegister };
