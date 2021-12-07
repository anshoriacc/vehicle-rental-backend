const profileModel = require("../models/profile");

const getProfile = (req, res) => {
  const { params } = req;
  const profileId = params.id;
  profileModel
    .getProfile(profileId)
    .then(({ status, result }) => {
      if (status == 404)
        return res.status(status).json({ msg: "User Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const editProfile = (req, res) => {
  const { body } = req;
  const profileId = body.id;
  profileModel
    .editProfile(profileId, body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Edit Profile berhasil",
        result,
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const deleteUser = (req, res) => {
  const { params } = req;
  const userId = params.id;
  profileModel
    .deleteUser(userId)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: `Penghapusan Kendaraan dengan id = ${userId} berhasil`,
        result,
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

module.exports = { getProfile, editProfile, deleteUser };
