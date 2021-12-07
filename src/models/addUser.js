const db = require("../config/db");

const addUser = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO users SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

module.exports = { addUser };
