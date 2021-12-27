const mysql = require("mysql");
const db = require("../config/db");
const { validateLogin } = require("../middlewares/validate");

const getVehicle = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT v.id, v.name AS "Kendaraan", l.name AS "lokasi", c.name AS "kategori"
    FROM vehicles v JOIN locations l ON v.location_id = l.id
    JOIN categories c ON v.category_id = c.id`;

    const statement = [];
    const order = query.order;
    let orderBy = "";
    if (query.by && query.by.toLowerCase() == "id") orderBy = "v.id";
    if (query.by && query.by.toLowerCase() == "lokasi") orderBy = "l.name";
    if (query.by && query.by.toLowerCase() == "kategori") orderBy = "c.name";
    if (order && orderBy) {
      sqlQuery += ` ORDER BY ? ? `;
      statement.push(orderBy, order);
    }
    const countQuery = `SELECT COUNT(*) AS "count" from vehicles`;
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      const page = parseInt(query.page);
      const limit = parseInt(query.limit);
      const count = result[0].count;
      if (query.page && query.limit) {
        sqlQuery += ` LIMIT ? OFFSET ?`;
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }
      const meta = {
        next:
          page == Math.ceil(count / limit)
            ? null
            : `/vehicles?by=${query.by}&order=${order}&page=${
                page + 1
              }&limit=${limit}`,
        prev:
          page == 1
            ? null
            : `/vehicles?by=${query.by}&order=${order}&page=${
                page - 1
              }&limit=${limit}`,
        count,
      };
      db.query(sqlQuery, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        return resolve({ status: 200, result: { data: result, meta } });
      });
    });
  });
};

const getVehicleByCategory = (category) => {
  return new Promise((resolve, reject) => {
    let categoryId;
    if (category && category.toLowerCase() === "bike") categoryId = 1;
    if (category && category.toLowerCase() === "car") categoryId = 2;
    if (category && category.toLowerCase() === "motorbike") categoryId = 3;
    let sqlQuery = `SELECT v.id, v.name AS "kendaraan", l.name AS "lokasi", c.name AS "kategori"
    FROM vehicles v JOIN locations l ON v.location_id = l.id
    JOIN categories c ON v.category_id = c.id
    WHERE c.id = ${categoryId}`;

    db.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      return resolve({ status: 200, result: { data: result } });
    });

    if (category && category.toLowerCase() === "popular") {
      sqlQuery = `SELECT v.id, v.name AS "kendaraan", l.name AS "lokasi", c.name AS "kategori", `;
    }
  });
};

const postNewVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

const vehicleDetail = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name AS "Kendaraan", l.name AS "Lokasi", c.name AS "Kategori", v.price AS "Harga", v.stock AS "Stok"
    FROM vehicles v
    INNER JOIN locations l ON v.location_id = l.id
    INNER JOIN categories c ON v.category_id = c.id
    WHERE v.id = ?`;
    db.query(sqlQuery, vehicleId, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result: { data: result } });
    });
  });
};

const editVehicle = (vehicleId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicles
    SET ?
    WHERE id = ?`;
    db.query(sqlQuery, [body, vehicleId], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

const deleteVehicle = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM vehicles WHERE id = ?`;
    db.query(sqlQuery, vehicleId, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 201, result: { data: result } });
    });
  });
};

module.exports = {
  getVehicle,
  getVehicleByCategory,
  postNewVehicle,
  vehicleDetail,
  editVehicle,
  deleteVehicle,
};
