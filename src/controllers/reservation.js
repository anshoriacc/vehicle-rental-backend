const reservationModel = require('../models/reservation');
const resHelper = require('../helpers/response');

const getReservationAdmin = (req, res) => {
  reservationModel
    .getReservationAdmin()
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      if (status == 404) return resHelper.error(res, status, err);
      return resHelper.error(res, status, err);
      // res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const getReservationCustomer = (req, res) => {
  const {userInfo} = req;
  const userId = userInfo.id;

  reservationModel
    .getReservationCustomer(userId)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
      // if (status == 404)
      //   return res
      //     .status(status)
      //     .json({errMsg: 'Pemesanan Tidak Ditemukan', result});
      // res.status(status).json({result});
    })
    .catch(({status, err}) => {
      if (status == 404) return resHelper.error(res, status, err);
      return resHelper.error(res, status, err);
      // res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const makeReservation = (req, res) => {
  // console.log(req);
  const {userInfo, body} = req;
  const userId = userInfo.id;

  const newBody = {...body, user_id: userId};

  reservationModel
    .makeReservation(newBody)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
      // res.status(status).json({
      //   msg: 'Pemesanan Kendaraan Berhasil',
      //   result,
      // });
    })
    .catch((status, err) => {
      return resHelper.error(res, status, err);
      // res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const rate = (req, res) => {
  const {params, body} = req;
  const reservationId = params.id;
  console.log(reservationId, body);

  reservationModel
    .rate(reservationId, body)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
      // res.status(status).json({
      //   msg: `Penambahan rating pada reservation dengan id = ${reservationId} berhasil`,
      //   result,
      // });
    })
    .catch((status, err) => {
      return resHelper.error(res, status, err);
      // res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

module.exports = {
  getReservationAdmin,
  getReservationCustomer,
  makeReservation,
  rate,
};
