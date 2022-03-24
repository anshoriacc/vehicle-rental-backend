const jwt = require('jsonwebtoken');
const db = require('../config/db');
const resHelper = require('../helpers/response');

const authorize = (req, res, next) => {
  const token = req.header('x-access-token');
  const jwtOptions = {
    // issuer: process.env.ISSUER,
  };
  const sqlQuery = `SELECT token FROM blacklist_token WHERE token = ?`;
  db.query(sqlQuery, [token], (err, result) => {
    if (err) {
      return resHelper.error(res, 500, {
        status: 500,
        msg: 'Something went wrong',
        data: null,
      });
    }
    if (result.length !== 0) {
      return resHelper.error(res, 403, {
        status: 403,
        msg: 'You need to login first',
        data: null,
      });
    }
  });
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) {
      return resHelper.error(res, 403, {
        status: 403,
        msg: 'You need to login first',
        data: null,
      });
    }
    const {id, role_id} = payload;
    req.userInfo = {id, role_id};
    next();
  });
};

const authorizeOwner = (req, res, next) => {
  const {role_id} = req.userInfo;
  if (role_id !== 1)
    return resHelper.error(res, 403, {
      status: 403,
      msg: 'You need to login as an owner.',
      data: null,
    });
  next();
};

const authorizeCustomer = (req, res, next) => {
  const {role_id} = req.userInfo;
  if (role_id !== 2)
    return resHelper.error(res, 403, {
      status: 403,
      msg: 'You need to login as a customer.',
      data: null,
    });
  next();
};

module.exports = {
  authorize,
  authorizeOwner,
  authorizeCustomer,
};
