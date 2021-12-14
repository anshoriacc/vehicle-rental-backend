const userModel = require("../models/users");

const addUser = (req, res) => {
  const { body } = req;
  userModel
    .addUser(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Penambahan User Berhasil",
        result: {
          ...body,
          password: "hidden",
          id: result.insertId,
        },
      });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const detailUser = (req, res) => {
  const { params } = req;
  const userId = params.id;
  userModel
    .detailUser(userId)
    .then(({ status, result }) => {
      if (status == 404)
        return res.status(status).json({ msg: "User Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

const editUser = (req, res) => {
  const { body } = req;
  const userId = body.id;
  userModel
    .editUser(userId, body)
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
  userModel
    .deleteUser(userId)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: `Penghapusan User dengan id = ${userId} berhasil`,
        result,
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

module.exports = { addUser, detailUser, editUser, deleteUser };
