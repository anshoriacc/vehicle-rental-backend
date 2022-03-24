const vehicleModel = require('../models/vehicles');
const resHelper = require('../helpers/response');

const searchVehicle = (req, res) => {
  const {query} = req;

  vehicleModel
    .searchVehicle(query)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

// const getVehicle = (req, res) => {
//   const {query} = req;
//   console.log(query)
//   vehicleModel
//     .getVehicle(query)
//     .then(({status, result}) => {
//       return resHelper.success(res, status, result);
//     })
//     .catch(({status, err}) => {
//       return resHelper.error(res, status, err);
//     });
// };

const getVehicleByCategory = (req, res) => {
  const category = req.params.category;
  const {page, limit} = req.query;

  vehicleModel
    .getVehicleByCategory(category, limit, page)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const postNewVehicle = (req, res) => {
  console.log(req);
  const {body, userInfo, files} = req;
  const userId = userInfo.id;

  const newFiles = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i].path.slice(7));
  }

  if (files) {
    const photo = JSON.stringify(newFiles);
    newBody = {
      ...body,
      photo: photo,
      user_id: userId,
    };
  } else {
    newBody = {...body, user_id: userId};
  }

  vehicleModel
    .postNewVehicle(newBody)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const vehicleDetail = (req, res) => {
  const {params} = req;
  const vehicleId = params.id;
  console.log(params);
  vehicleModel
    .vehicleDetail(vehicleId)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const editVehicle = (req, res) => {
  const {body, files, params} = req;
  const vehicleId = params.id;

  const newFiles = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i].path.slice(7));
  }

  if (files) {
    const photo = JSON.stringify(newFiles);
    newBody = {
      ...body,
      photo: photo,
    };
  } else {
    newBody = {...body};
  }

  vehicleModel
    .editVehicle(vehicleId, newBody)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const deleteVehicle = (req, res) => {
  const {params} = req;
  const vehicleId = params.id;
  vehicleModel
    .deleteVehicle(vehicleId)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
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
