const reservationModel = require("../models/reservation");

const getReservation = (req, res) => {
  reservationModel
    .getReservation()
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ errMsg: "Pemesanan Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const postReservation = (req, res) => {
  const { body } = req;
  reservationModel
    .postReservation(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Pemesanan Kendaraan Berhasil",
        result,
      });
    })
    .catch((status, err) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

module.exports = { getReservation, postReservation };
