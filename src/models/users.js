const db = require("../config/db");

const addUser = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO users SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

const detailUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT id, name, email, phone, gender, address, dob
      FROM users
      WHERE id = ?`;
    db.query(sqlQuery, userId, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result: { data: result } });
    });
  });
};

const editUser = (userId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users
      SET ?
      WHERE id = ?`;
    db.query(sqlQuery, [body, userId], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM users WHERE id = ?`;
    db.query(sqlQuery, userId, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

module.exports = { addUser, detailUser, editUser, deleteUser };
