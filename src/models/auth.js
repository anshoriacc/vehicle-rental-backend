const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendForgotPass} = require('../helpers/sendOtp');

const register = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO users SET ?`;

    bcrypt
      .hash(body.password, 10)
      .then((hashedPassword) => {
        const newBody = {
          ...body,
          password: hashedPassword,
        };

        db.query(sqlQuery, newBody, (err, result) => {
          if (err && err.errno === 1062)
            return reject({
              status: 400,
              err: {
                msg: 'Email address already registered, use another email address.',
                data: null,
              },
            });

          return resolve({
            status: 201,
            result: {
              msg: 'Registration success.',
              data: {
                id: result.insertId,
                name: body.name,
                email: body.email,
                roles: body.role_id,
              },
            },
          });
        });
      })
      .catch((err) => {
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const {email, password} = body;
    const sqlQuery = `SELECT * FROM users WHERE ?`;
    db.query(sqlQuery, {email}, (err, result) => {
      if (err) {
        console.log({...err});
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      }
      if (result.length == 0) {
        return reject({
          status: 401,
          err: {msg: 'Check your email/password.', data: null},
        });
      }

      bcrypt.compare(password, result[0].password, (err, res) => {
        if (err)
          return reject({
            status: 500,
            err: {msg: 'Something went wrong.', data: null},
          });
        if (res === false) {
          return reject({
            status: 401,
            err: {msg: 'Wrong email/password', data: null},
          });
        }

        const payload = {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          photo: result[0].photo,
          role_id: result[0].role_id,
        };
        const jwtOptions = {
          expiresIn: '1d',
          // issuer: process.env.ISSUER,
        };

        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          if (err)
            return reject({
              status: 500,
              err: {msg: 'Login failed.', data: null},
            });
          return resolve({
            status: 200,
            result: {
              msg: 'Login success',
              data: {
                token: token,
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                photo: result[0].photo,
                role_id: result[0].role_id,
              },
            },
          });
        });
      });
    });
  });
};

const logout = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO blacklist_token (token) VALUES (?)`;

    db.query(sqlQuery, [token], (err, result) => {
      if (err) {
        return reject({
          status: 500,
          err: {msg: 'Logout Failed', data: null},
        });
      }
      return resolve({
        status: 200,
        result: {msg: 'Logout Success', data: null},
      });
    });
  });
};

const forgot = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;

    db.query(sqlQuery, email, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      if (result.length == 0)
        return reject({
          status: 401,
          err: {msg: 'Invalid email address.'},
        });

      const name = result[0].name;
      const otp = Math.ceil(Math.random() * 1000000);

      const sqlQuery = `UPDATE users SET otp = ? WHERE email = ?`;
      db.query(sqlQuery, [otp, email], (err) => {
        if (err)
          return reject({
            status: 500,
            err: {msg: 'Something went wrong.', data: null},
          });
        sendForgotPass(email, {name: name, otp});
        const data = {
          email: email,
          otp
        };
        return resolve({
          status: 200,
          result: {msg: 'Success generate otp.', data},
        });
      });
    });
  });
};

const checkOtp = (body) => {
  return new Promise((resolve, reject) => {
    const {email, otp} = body;
    const sqlQuery = `SELECT email, otp FROM users WHERE email = ? AND otp = ?`;
    db.query(sqlQuery, [email, otp], (err, result) => {
      if (err) return reject({status: 500, err});
      if (result.length === 0)
        return reject({status: 401, err: {msg: 'Invalid OTP'}});
      const data = {
        email: email,
      };
      resolve({status: 200, result: {msg: 'OTP is valid', data}});
    });
  });
};

const resetPassword = (body) => {
  return new Promise((resolve, reject) => {
    const {email, password, otp} = body;
    const sqlQuery = `SELECT * FROM users WHERE email = ? AND otp = ?`;

    db.query(sqlQuery, [email, otp], (err) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong', data: null},
        });

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const sqlUpdatePass = `UPDATE users SET password = ?, otp = null WHERE email = ? AND otp = ?`;
          db.query(sqlUpdatePass, [hashedPassword, email, otp], (err) => {
            if (err) {
              return reject({
                status: 500,
                err: {msg: 'Something went wrong', data: null},
              });
            }
            return resolve({
              status: 200,
              result: {
                msg: 'Reset password success',
                data: {
                  email,
                },
              },
            });
          });
        })
        .catch((err) => {
          reject({status: 500, err});
        });
    });
  });
};

const changePassword = (oldPassword, newPassword, id) => {
  return new Promise((resolve, reject) => {
    const sqlGetOldPassword =
      'SELECT id, email, password from users WHERE id = ?';
    db.query(sqlGetOldPassword, [id], (err, result) => {
      if (err) {
        return reject({
          status: 500,
          err: {msg: 'Something went wrong', data: null},
        });
      }
      const passwordHased = result[0].password;
      bcrypt.compare(oldPassword, passwordHased, (err, result) => {
        if (err) {
          return reject({
            status: 500,
            err: {msg: 'Something went wrong', data: null},
          });
        }
        if (result === false) {
          return reject({
            status: 400,
            err: {msg: 'Incorect old password', data: null},
          });
        }
        bcrypt
          .hash(newPassword, 10)
          .then((hashedPassword) => {
            const sqlUpdatePassword = `UPDATE users
            SET password = ?
            WHERE id = ?`;
            db.query(sqlUpdatePassword, [hashedPassword, id], (err, result) => {
              if (err) {
                return reject({
                  status: 500,
                  err: {msg: 'Something went wrong', data: null},
                });
              }
              return resolve({
                status: 200,
                result: {msg: 'Update password success', data: null},
              });
            });
          })
          .catch((err) => {
            console.log(err);
            return reject({
              status: 500,
              err: {msg: 'Something went wrong', data: null},
            });
          });
      });
    });
  });
};

module.exports = {
  register,
  login,
  logout,
  forgot,
  checkOtp,
  resetPassword,
  changePassword,
};
