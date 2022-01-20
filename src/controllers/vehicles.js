const vehicleModel = require("../models/vehicles");

const getVehicle = (req, res) => {
  const { query } = req;
  vehicleModel
    .getVehicle(query)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ errMsg: "Kendaraan Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const getVehicleByCategory = (req, res) => {
  const category = req.params.category;
  const { page, limit } = req.query;

  vehicleModel
    .getVehicleByCategory(category, limit, page)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ errMsg: "Kendaraan Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const searchVehicle = (req, res) => {
  const { query } = req;
  vehicleModel
    .searchVehicle(query)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ errMsg: "Kendaraan Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const postNewVehicle = (req, res) => {
  const { body, userInfo } = req;
  const userId = userInfo.id;

  const newBody = { ...body, user_id: userId };

  vehicleModel
    .postNewVehicle(newBody)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Penambahan Kendaraan Berhasil",
        result,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const vehicleDetail = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;
  vehicleModel
    .vehicleDetail(vehicleId)
    .then(({ status, result }) => {
      if (status == 404)
        return res.status(status).json({ errMsg: "Kendaraan Tidak Ditemukan" });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const editVehicle = (req, res) => {
  const { body, file } = req;
  const vehicleId = body.id;

  if (file) {
    newBody = {
      ...body,
      photo: file.path.slice(7),
    };
  } else {
    newBody = { ...body };
  }

  vehicleModel
    .editVehicle(vehicleId, body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Edit Kendaraan berhasil",
        result,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const deleteVehicle = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;
  vehicleModel
    .deleteVehicle(vehicleId)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: `Penghapusan User dengan id = ${vehicleId} berhasil`,
        result,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
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
