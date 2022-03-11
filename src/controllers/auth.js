const authModel = require('../models/auth');
const resHelper = require('../helpers/response');

const register = (req, res) => {
  const {body} = req;
  authModel
    .register(body)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const login = (req, res) => {
  const {body} = req;
  authModel
    .login(body)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const logout = (req, res) => {};

const forgot = (req, res) => {
  const {email} = req.body;
  authModel
    .forgot(email)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

module.exports = {register, login, logout, forgot};
