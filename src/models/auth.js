const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
          // expiresIn: "15m",
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
  return new Promise((resolve, reject) => {});
};

const forgot = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM user WHERE email = ?`;

    db.query(sqlQuery, email, (err, result) => {
      if (err) return reject({status: 500, err});
      if (result.length == 0)
        return reject({
          status: 401,
          err: {msg: 'Invalid email address.'},
        });

      const otp = Math.ceil(Math.random() * 1000000);
      console.log('OTP ', otp);

      const sqlQuery = `UPDATE users SET otp = ? WHERE email = ?`;
      db.query(sqlQuery, [otp, email], (err) => {
        if (err)
          return reject({status: 500, err: {msg: 'Something went wrong'}});
        const data = {
          email: email,
          otp,
        };
        return resolve({status: 200, result: {msg: 'Success ', data}});
      });
    });
  });
};

module.exports = {register, login, logout, forgot};
