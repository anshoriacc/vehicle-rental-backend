const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
          if (err) return reject({ status: 500, err });
          resolve({ status: 201, result: { data: result } });
        });
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const sqlQuery = `SELECT * FROM users WHERE ?`;
    db.query(sqlQuery, { email }, (err, result) => {
      if (err) {
        return reject({ status: 500, err });
      }
      if (result.length == 0) {
        console.log(result);
        return resolve({
          status: 401,
          result: {
            msg: "Check your email/password.", //
          },
        });
      }

      bcrypt.compare(password, result[0].password, (err, res) => {
        if (err || !res) return reject({ status: 500, err }); //salah
        const payload = {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          role_id: result[0].role_id,
        };
        const jwtOptions = {
          expiresIn: "15m",
          issuer: process.env.ISSUER,
        };
        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          if (err) reject({ status: 500, err });
          resolve({ status: 200, result: { token } });
        });
      });
    });
  });
};

const logout = (token) => {
  return new Promise((resolve, reject) => {});
};

module.exports = { register, login, logout };
