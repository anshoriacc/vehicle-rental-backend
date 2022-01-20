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
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const detailUser = (req, res) => {
  const { userInfo } = req;
  const userId = userInfo.id;
  userModel
    .detailUser(userId)
    .then(({ status, result }) => {
      if (status == 404)
        return res
          .status(status)
          .json({ errMsg: "User Tidak Ditemukan", result });
      res.status(status).json({ result });
    })
    .catch(({ status, err }) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

const editUser = (req, res) => {
  const { body, userInfo, file } = req;
  const userId = userInfo.id;
  let newBody;

  if (file) {
    newBody = {
      ...body,
      photo: file.path.slice(7),
    };
  } else {
    newBody = { ...body };
  }

  userModel
    .editUser(userId, newBody)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Edit Profile berhasil",
      });
    })
    .catch((status, err) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
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
      });
    })
    .catch((status, err) => {
      res.status(status).json({ errMsg: "Terjadi Error", err });
    });
};

module.exports = { addUser, detailUser, editUser, deleteUser };
