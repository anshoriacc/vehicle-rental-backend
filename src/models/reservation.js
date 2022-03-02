const db = require("../config/db");

const getReservationAdmin = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT r.id, u.name AS "Pemesan", v.name AS "vehicle", r.quantity, r.start_date, r.return_date, r.payment
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

const getReservationCustomer = (userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT r.id, v.name AS "vehicle", r.quantity, r.start_date, r.return_date, r.payment, r.total, v.photo
    FROM reservation r JOIN users u ON r.user_id = u.id
    JOIN vehicles v ON r.vehicle_id = v.id WHERE u.id = ?`;
    db.query(sqlQuery, userId, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return resolve({ status: 404, result: { data: result } });
      resolve({ status: 200, result: { data: result } });
    });
  });
};

const makeReservation = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO reservation SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({
        status: 201,
        result: { data: { id: result.insertId, ...body } },
      });
    });
  });
};

const rate = (reservationId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE reservation SET ? WHERE id = ?`;
    db.query(sqlQuery, [body, reservationId], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({
        status: 201,
        result: { data: { id: reservationId, ...body } },
      });
    });
  });
};

module.exports = {
  getReservationAdmin,
  getReservationCustomer,
  makeReservation,
  rate,
};
