const db = require("../config/db");

const getProfile = (profileId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT id, name, email, phone, gender, address, dob
      FROM users
      WHERE id = ${profileId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const editProfile = (profileId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users
      SET ?
      WHERE id = ${profileId}`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM users WHERE id = ${userId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

module.exports = { getProfile, editProfile, deleteUser };
