const db = require('../config/db');
const mysql = require('mysql');

const userFavourite = (query, userInfo) => {
  return new Promise((resolve, reject) => {
    const {page, limit} = query;
    let {id} = userInfo;
    console.log('userinfo', userInfo);
    const sqlPage = !page || page === '' ? '1' : page;
    const sqlLimit = !limit || limit === '' ? '15' : limit;
    const offset = (parseInt(sqlPage) - 1) * parseInt(sqlLimit);
    let userId = 'f.user_id = ';
    id = String(id);

    const prepare = [
      mysql.raw(userId),
      mysql.raw(id),
      mysql.raw(sqlLimit),
      offset,
    ];

    const sqlCount = `SELECT count(*) count
    FROM favourite f LEFT JOIN vehicles v ON v.id = f.vehicle_id
    WHERE ? ?`;

    db.query(sqlCount, prepare, (err, result) => {
      if (err) {
        console.log(err);
        return reject({
          status: 500,
          err: {msg: 'Something went wrong', data: null},
        });
      }
      const totalData = result[0].count;
      const nextOffset = parseInt(offset) + parseInt(sqlLimit);
      let nextPage = '?';
      let prevPage = '?';
      const nPage = nextOffset >= totalData ? null : parseInt(sqlPage) + 1;
      const pPage = sqlPage > 1 ? +sqlPage - 1 : null;
      const totalPage = Math.ceil(totalData / parseInt(sqlLimit));
      if (nPage == null) {
        nextPage = null;
      } else {
        const nextCount = parseInt(sqlPage) + 1;
        nextPage += 'page=' + nextCount;
        if (limit) {
          nextPage += '&limit=' + limit;
        }
      }
      if (pPage == null) {
        prevPage = null;
      } else {
        const prevCounter = parseInt(sqlPage) - 1;
        prevPage += 'page=' + prevCounter;
        if (limit) {
          prevPage += '&limit=' + limit;
        }
      }

      const meta = {
        totalData,
        prevPage,
        page: sqlPage,
        nextPage,
        totalPage,
      };

      const sqlSelect = `SELECT v.id, v.name AS "name", v.price AS "price", v.stock AS "stock", v.photo, v.user_id
            FROM favourite f LEFT JOIN vehicles v ON v.id = f.vehicle_id
            WHERE ? ?
            ORDER BY f.liked_at DESC
            LIMIT ? OFFSET ?`;

      db.query(sqlSelect, prepare, (err, result) => {
        if (err) {
          console.log(err);
          return reject({
            status: 500,
            err: {msg: 'Something went wrong', data: null},
          });
        }
        return resolve({
          status: 200,
          result: {
            msg: `List of user favourite's item.`,
            data: result,
            meta,
          },
        });
      });
    });
  });
};

const addToFavourite = (req) => {
  return new Promise((resolve, reject) => {
    const {body, userInfo} = req;
    const idUser = userInfo.id;
    const {vehicle_id} = body;

    const bodyFavourite = {
      user_id: idUser,
      vehicle_id,
    };

    const sqlAdd = `INSERT INTO favourite SET ?`;

    db.query(sqlAdd, bodyFavourite, (err, result) => {
      if (err) {
        return reject({
          status: 500,
          err: {msg: 'Something went wrong', data: null},
        });
      }

      return resolve({
        status: 200,
        result: {
          msg: 'Add to favourite success.',
          data: {
            id: result.insertId,
            user_id: idUser,
            vehicle_id,
          },
        },
      });
    });
  });
};

const deleteFromFavourite = (idUser, vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlDelete = `DELETE FROM favourite WHERE user_id = ? AND vehicle_id = ?`;
    db.query(sqlDelete, [idUser, vehicleId], (err, result) => {
      if (err) {
        console.log(err);
        return reject({
          status: 500,
          err: {msg: 'Something went wrong', data: null},
        });
      }
      return resolve({
        status: 200,
        result: {
          msg: `Product Deleted`,
          data: null,
        },
      });
    });
  });
};

module.exports = {
  userFavourite,
  addToFavourite,
  deleteFromFavourite,
};
