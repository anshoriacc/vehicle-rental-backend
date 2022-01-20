const authModel = require("../models/auth");

const register = (req, res) => {
  const { body } = req;
  authModel
    .register(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Registrasi Berhasil",
        result,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const login = (req, res) => {
  const { body } = req;
  authModel
    .login(body)
    .then(({ status, result }) => {
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const logout = (req, res) => {};

module.exports = { register, login, logout };
