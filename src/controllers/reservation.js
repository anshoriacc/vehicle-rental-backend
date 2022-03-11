const reservationModel = require('../models/reservation');
const resHelper = require('../helpers/response');

const getReservationAdmin = (req, res) => {
  const {userInfo} = req;
  const userId = userInfo.id;
  
  reservationModel
    .getReservationAdmin(userId)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      if (status == 404) return resHelper.error(res, status, err);
      return resHelper.error(res, status, err);
    });
};

const getReservationCustomer = (req, res) => {
  const {userInfo} = req;
  const userId = userInfo.id;

  reservationModel
    .getReservationCustomer(userId)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      if (status == 404) return resHelper.error(res, status, err);
      return resHelper.error(res, status, err);
    });
};

const makeReservation = (req, res) => {
  const {userInfo, body} = req;
  const userId = userInfo.id;

  const newBody = {...body, user_id: userId};

  reservationModel
    .makeReservation(newBody)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch((status, err) => {
      return resHelper.error(res, status, err);
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
    })
    .catch((status, err) => {
      return resHelper.error(res, status, err);
    });
};

module.exports = {
  getReservationAdmin,
  getReservationCustomer,
  makeReservation,
  rate,
};
