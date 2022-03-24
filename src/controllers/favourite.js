const favouriteModel = require("../models/favourite");
const resHelper = require("../helpers/response");

const userFavourite = (req, res) => {
  const { query, userInfo } = req;
  favouriteModel
    .userFavourite(query, userInfo)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return resHelper.error(res, status, err);
    });
};

const addToFavourite = (req, res) => {
  favouriteModel
    .addToFavourite(req)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return resHelper.error(res, status, err);
    });
};

const deleteFromFavourite = (req, res) => {
  const { params, userInfo } = req;
  const idUser = userInfo.id;
  favouriteModel
    .deleteFromFavourite(idUser, params.id)
    .then(({ status, result }) => {
      return resHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return resHelper.error(res, status, err);
    });
};

module.exports = {
  userFavourite,
  addToFavourite,
  deleteFromFavourite,
};
