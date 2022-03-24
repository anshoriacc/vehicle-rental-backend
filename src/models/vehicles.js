const mysql = require('mysql');
const db = require('../config/db');
const {getTimestamp} = require('../helpers/timestamp');

const searchVehicle = (query) => {
  return new Promise((resolve, reject) => {
    let {keyword, category, orderby, sort, page, limit} = query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 15;
    const offset = (page - 1) * limit;
    sort = sort && sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const priceMin = parseInt(query.priceMin) || 0;
    const priceMax = parseInt(query.priceMax) || 100 * 1000 * 1000;

    const sqlSearch =
      keyword && keyword !== ''
        ? `v.name LIKE '%${keyword}%'`
        : `v.name LIKE '%%'`;

    let categoryId;
    if (category) {
      category = category.toLowerCase();
      if (category == 'bike') categoryId = 1;
      if (category == 'car') categoryId = 2;
      if (category == 'motorbike') categoryId = 3;
    } else {
      categoryId = null;
    }

    const sqlcategoryId = categoryId
      ? `v.category_id = ${categoryId}`
      : 'v.category_id IS NOT NULL';

    const sqlPrice = `v.price BETWEEN ${priceMin} AND ${priceMax}`;

    // console.log('keyword', keyword);
    // console.log('category', category);
    // console.log('sort', sort);
    // console.log('page', page);
    // console.log('limit', limit);
    // console.log('priceMin', priceMin);
    // console.log('priceMax', priceMax);
    // console.log('orderby', orderby);

    if (orderby === 'price') {
      orderby = 'v.price';
    } else if (orderby === 'location') {
      orderby = 'l.name';
    } else if (orderby === 'name') {
      orderby = 'v.name';
    } else {
      orderby = 'v.id';
    }

    const statement = [
      mysql.raw(sqlSearch),
      mysql.raw(sqlcategoryId),
      mysql.raw(sqlPrice),
      mysql.raw(orderby),
      mysql.raw(sort),
      limit,
      offset,
    ];

    let countQuery = `SELECT COUNT(*) as "count"
    FROM vehicles v JOIN locations l ON v.location_id = l.id
    JOIN categories c ON v.category_id = c.id
    WHERE ? AND ? AND ? AND v.deleted_at IS NULL`;

    let sqlQuery = `SELECT v.id, v.name, v.price, l.name AS "location", c.name AS "category", v.photo, v.stock, v.rating
    FROM vehicles v JOIN locations l ON v.location_id = l.id
    JOIN categories c ON v.category_id = c.id
    WHERE ? AND ? AND ? AND v.deleted_at IS NULL
    ORDER BY ? ? LIMIT ? OFFSET ?`;

    // let nextPage = `/vehicles?orderby=${orderby}&order=${order}&page=${
    //   page + 1
    // }&limit=${limit}`;

    // let prevPage = `/vehicles?orderby=${orderby}&order=${order}&page=${
    //   page - 1
    // }&limit=${limit}`;

    // let countQuery = `SELECT COUNT(*) AS "count" FROM vehicles`;

    // if (category) {
    //   category = category.toLowerCase();
    //   let categoryId;
    //   if (category == 'bike') categoryId = 1;
    //   if (category == 'car') categoryId = 2;
    //   if (category == 'motorbike') categoryId = 3;

    //   let categoryQuery = ` WHERE category_id = ?`;

    //   countQuery += categoryQuery;

    //   sqlQuery += categoryQuery;
    //   statement.push(categoryId);

    //   nextPage = `/vehicles?category=${category}&orderby=${orderby}&order=${order}&page=${
    //     page + 1
    //   }&limit=${limit}`;
    //   prevPage = `/vehicles?category=${category}&orderby=${orderby}&order=${order}&page=${
    //     page - 1
    //   }&limit=${limit}`;
    // }

    // let orderBased = '';
    // if (orderby && orderby.toLowerCase() == 'id') orderBased = 'v.id';
    // if (orderby && orderby.toLowerCase() == 'lokasi') orderBased = 'l.id';
    // if (orderby && orderby.toLowerCase() == 'kategori') orderBased = 'c.id';
    // if (order && orderBased) {
    //   sqlQuery += ` ORDER BY ? ? `;
    //   statement.push(mysql.raw(orderBased), mysql.raw(order));
    // }

    // if (page && limit) {
    //   sqlQuery += ` LIMIT ? OFFSET ?`;
    //   const offset = (page - 1) * limit;
    //   statement.push(limit, offset);
    // }

    db.query(countQuery, statement, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong with count query.', data: null},
        });

      const count = result[0].count;

      const meta = {
        // next: page == Math.ceil(count / limit) ? null : nextPage,
        // prev: page == 1 ? null : prevPage,
        page: page ? parseInt(page) : 1,
        totalPage:
          count < parseInt(limit) ? 1 : Math.ceil(count / parseInt(limit)),
        limit,
        count,
      };

      db.query(sqlQuery, statement, (err, result) => {
        if (err) return reject({status: 500, err});
        return resolve({status: 200, result: {data: result, meta}});
      });
    });
  });
};

const getVehicleByCategory = (category, limit, page) => {
  return new Promise((resolve, reject) => {
    console.log('category', category);
    page = parseInt(page);
    limit = parseInt(limit);

    let sqlQuery = `SELECT v.id, v.name as vehicle, l.name as location, c.name as category, v.price, v.photo, v.stock, v.rating
    FROM vehicles v
    JOIN locations l ON v.location_id = l.id
    JOIN categories c ON v.category_id = c.id`;

    const statement = [];
    let nextPage, prevPage;

    let countQuery = `SELECT COUNT(*) AS "count" from vehicles`;

    if (category && category.toLowerCase() === 'popular') {
      sqlQuery = `SELECT v.id, v.name as vehicle, l.name as location, c.name as category, v.price, v.photo, v.stock, avg(r.rating) as rating
      FROM vehicles v
      JOIN locations l ON v.location_id = l.id
      JOIN categories c ON v.category_id = c.id
      JOIN reservation r ON v.id = r.vehicle_id
      GROUP BY v.id
      ORDER BY sum(r.rating) DESC`;

      countQuery = `SELECT COUNT(*) as count
      FROM (${sqlQuery}) as popularQuery`;
    }

    let categoryId;
    if (
      category.toLowerCase() === 'bike' ||
      category.toLowerCase() === 'car' ||
      category.toLowerCase() === 'motorbike'
    ) {
      if (category.toLowerCase() === 'bike') {
        categoryId = 1;
        statement.push(categoryId);
      }
      if (category.toLowerCase() === 'car') {
        categoryId = 2;
        statement.push(categoryId);
      }
      if (category.toLowerCase() === 'motorbike') {
        categoryId = 3;
        statement.push(categoryId);
      }
      sqlQuery += `
        WHERE v.category_id = ?
        ORDER BY v.id ASC`;
      countQuery += ` WHERE category_id = ?`;
    }

    if (!limit) sqlQuery += ` LIMIT 16`;

    if (limit && page) {
      const offset = (page - 1) * limit;
      statement.push(limit);
      statement.push(offset);
      sqlQuery += ` LIMIT ? OFFSET ?`;
      nextPage = `/vehicles/${category}?limit=${limit}&page=${page + 1}`;
      prevPage = `/vehicles/${category}?limit=${limit}&page=${page - 1}`;
    }

    // console.log("sql", sqlQuery);
    // console.log("count", countQuery);

    // console.log("statement", statement);
    db.query(countQuery, categoryId, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });

      const count = result[0].count;
      const meta = {
        next: page == Math.ceil(count / limit) ? null : nextPage,
        prev: page == 1 ? null : prevPage,
        count: count,
      };

      db.query(sqlQuery, statement, (err, result) => {
        if (err)
          return reject({
            status: 500,
            err: {msg: 'Something went wrong.', data: null},
          });
        return resolve({
          status: 201,
          result: {
            msg: 'Success get vehicle',
            data: result,
            meta,
          },
        });
      });
    });
  });
};

const postNewVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    db.query(sqlQuery, body, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      return resolve({
        status: 201,
        result: {
          msg: 'Success add vehicle',
          data: {...body, id: result.insertId},
        },
      });
    });
  });
};

const vehicleDetail = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT v.id, v.name AS "name", l.name AS "location", c.name AS "category", v.price AS "price", v.stock AS "stock", v.photo, v.user_id
    FROM vehicles v
    INNER JOIN locations l ON v.location_id = l.id
    INNER JOIN categories c ON v.category_id = c.id
    WHERE v.id = ? AND v.deleted_at IS NULL`;

    db.query(sqlQuery, mysql.raw(vehicleId), (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      if (result.length == 0)
        return resolve({
          status: 201,
          result: {
            msg: 'No vehicle to display',
            data: null,
          },
        });
      return resolve({
        status: 201,
        result: {
          msg: 'Success get vehicle detail',
          data: result[0],
        },
      });
    });
  });
};

const editVehicle = (vehicleId, body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicles
    SET ?
    WHERE id = ?`;
    db.query(sqlQuery, [body, vehicleId], (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      return resolve({
        status: 201,
        result: {
          msg: 'Success edit vehicle',
          data: body,
        },
      });
    });
  });
};

const deleteVehicle = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const deleted_at = getTimestamp();

    const sqlQuery = `UPDATE vehicles
    SET  deleted_at = ?
    WHERE id = ?`;
    db.query(sqlQuery, [deleted_at, vehicleId], (err, result) => {
      if (err)
        return reject({
          status: 500,
          err: {msg: 'Something went wrong.', data: null},
        });
      return resolve({
        status: 201,
        result: {
          msg: 'Success delete vehicle',
          data: result,
        },
      });
    });
  });
};

module.exports = {
  // getVehicle,
  getVehicleByCategory,
  searchVehicle,
  postNewVehicle,
  vehicleDetail,
  editVehicle,
  deleteVehicle,
};
