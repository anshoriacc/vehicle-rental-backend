const db = require("../config/db");

const getReservation = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT r.id, u.name AS "Pemesan", v.name AS "Kendaraan", r.quantity, r.start_date, r.return_date, r.payment
    FROM reservation r JOIN users u ON r.user_id = u.id
    JOIN vehicles v ON r.vehicle_id = v.id`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return resolve({ status: 404, result: { data: result } });
      resolve({ status: 200, result: { data: result } });
    });
  });
};

const postReservation = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO reservation SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

module.exports = { getReservation, postReservation };
