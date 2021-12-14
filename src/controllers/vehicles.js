const vehicleModel = require("../models/vehicles");

const getVehicle = (req, res) => {
  const { query } = req;
  vehicleModel
    .getVehicle(query)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ msg: "Kendaraan Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const postNewVehicle = (req, res) => {
  const { body } = req;
  vehicleModel
    .postNewVehicle(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Penambahan Kendaraan Berhasil",
        result,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const vehicleDetail = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;
  vehicleModel
    .vehicleDetail(vehicleId)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ msg: "Kendaraan Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const editVehicle = (req, res) => {
  const { body } = req;
  const vehicleId = body.id;
  vehicleModel
    .editVehicle(vehicleId, body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Edit Kendaraan berhasil",
        result,
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
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
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

module.exports = {
  getVehicle,
  postNewVehicle,
  vehicleDetail,
  editVehicle,
  deleteVehicle,
};
