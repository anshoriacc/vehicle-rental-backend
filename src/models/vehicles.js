const db = require("../config/db");

const getVehicle = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name AS "Kendaraan", l.name AS "Lokasi"
    FROM vehicles v INNER JOIN locations l ON v.location_id = l.id`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const postNewVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const vehicleDetail = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name AS "Kendaraan", l.name AS "Lokasi", c.name AS "Kategori", v.price AS "Harga", v.stock AS "Stok"
    FROM vehicles v
    INNER JOIN locations l ON v.location_id = l.id
    INNER JOIN categories c ON v.category_id = c.id
    WHERE v.id = ${vehicleId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const editVehicle = (vehicleId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicles
    SET ?
    WHERE id = ${vehicleId}`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

const deleteVehicle = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM vehicles WHERE id = ${vehicleId}`;
    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result });
    });
  });
};

module.exports = {
  getVehicle,
  postNewVehicle,
  vehicleDetail,
  editVehicle,
  deleteVehicle,
};
