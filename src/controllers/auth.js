const authModel = require('../models/auth');
const resHelper = require('../helpers/response');

const register = (req, res) => {
  const {body} = req;
  authModel
    .register(body)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
      // res.status(status).json({
        //   msg: 'Registrasi Berhasil',
      //   result,
      // });
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
      // res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const login = (req, res) => {
  const {body} = req;
  authModel
    .login(body)
    .then(({status, result}) => {
      res.status(status).json({result});
    })
    .catch(({status, err}) => {
      res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const logout = (req, res) => {};

module.exports = {register, login, logout};
