const vehicleModel = require('../models/vehicles');

const getVehicle = (req, res) => {
  const {query} = req;
  console.log(query)
  vehicleModel
    .getVehicle(query)
    .then(({status, result}) => {
      if (status == 404)
        return res
          .status(status)
          .json({errMsg: 'Kendaraan Tidak Ditemukan', result});
      res.status(status).json({result});
    })
    .catch(({status, err}) => {
      res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const getVehicleByCategory = (req, res) => {
  const category = req.params.category;
  const {page, limit} = req.query;

  vehicleModel
    .getVehicleByCategory(category, limit, page)
    .then(({status, result}) => {
      if (status == 404)
        return res
          .status(status)
          .json({errMsg: 'Kendaraan Tidak Ditemukan', result});
      return res.status(status).json({result});
    })
    .catch(({status, err}) => {
      return res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const searchVehicle = (req, res) => {
  console.log(req);
  const {query} = req;

  vehicleModel
    .searchVehicle(query)
    .then(({status, result}) => {
      if (status == 404)
        return res
          .status(status)
          .json({errMsg: 'Kendaraan Tidak Ditemukan', result});
      return res.status(status).json({result});
    })
    .catch(({status, err}) => {
      return res.status(status).json({errMsg: 'Terjadi Error', err});
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
  // console.log(JSON.stringify(newFiles));
  // console.log(files[1].path);
  // console.log(files.path);
  // console.log(JSON.stringify(files));

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
  // const newBody = { ...body, user_id: userId };

  vehicleModel
    .postNewVehicle(newBody)
    .then(({status, result}) => {
      res.status(status).json({
        msg: 'Penambahan Kendaraan Berhasil',
        result: {...newBody, id: result.insertId},
      });
    })
    .catch(({status, err}) => {
      res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const vehicleDetail = (req, res) => {
  const {params} = req;
  const vehicleId = params.id;
  vehicleModel
    .vehicleDetail(vehicleId)
    .then(({status, result}) => {
      if (status == 404)
        return res.status(status).json({errMsg: 'Kendaraan Tidak Ditemukan'});
      res.status(status).json({result});
    })
    .catch(({status, err}) => {
      res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const editVehicle = (req, res) => {
  // console.log(req);
  const {body, files, params} = req;
  const vehicleId = params.id;

  const newFiles = [];
  for (let i = 0; i < files.length; i++) {
    newFiles.push(files[i].path.slice(7));
  }
  // console.log(JSON.stringify(newFiles));
  // console.log(files[1].path);
  // console.log(files.path);
  // console.log(JSON.stringify(files));

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
      res.status(status).json({
        msg: 'Edit Kendaraan berhasil',
        result,
      });
    })
    .catch(({status, err}) => {
      res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

const deleteVehicle = (req, res) => {
  const {params} = req;
  const vehicleId = params.id;
  vehicleModel
    .deleteVehicle(vehicleId)
    .then(({status, result}) => {
      res.status(status).json({
        msg: `Penghapusan User dengan id = ${vehicleId} berhasil`,
        result,
      });
    })
    .catch(({status, err}) => {
      res.status(status).json({errMsg: 'Terjadi Error', err});
    });
};

module.exports = {
  getVehicle,
  getVehicleByCategory,
  searchVehicle,
  postNewVehicle,
  vehicleDetail,
  editVehicle,
  deleteVehicle,
};
