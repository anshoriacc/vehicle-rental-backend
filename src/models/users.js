const db = require('../config/db');

const detailUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT id, name, email, phone, gender, address, dob, photo, created_at as createdAt, role_id as roles
    FROM users
      WHERE id = ?`;
    db.query(sqlQuery, userId, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      resolve({
        status: 200,
        result: {msg: 'Success get detail user.', data: result[0]},
      });
    });
  });
};

const editUser = (userId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users
      SET ?
      WHERE id = ?`;
    db.query(sqlQuery, [body, userId], (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      return resolve({
        status: 201,
        result: {msg: 'Success edit profile.', data: result},
      });
    });
  });
};

module.exports = {
  detailUser,
  editUser,
};
