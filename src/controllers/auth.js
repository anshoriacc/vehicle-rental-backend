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

const logout = (req, res) => {
  const token = req.header('x-access-token');
  authModel
    .logout(token)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

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

const checkOtp = (req, res) => {
  const {body} = req;
  authModel
    .checkOtp(body)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const resetPassword = (req, res) => {
  const {body} = req;
  authModel
    .resetPassword(body)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const changePassword = (req, res) => {
  const {body, userInfo} = req;
  const {oldPassword, newPassword} = body;
  authModel
    .changePassword(oldPassword, newPassword, userInfo.id)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};
module.exports = {register, login, logout, forgot, checkOtp, resetPassword, changePassword};
