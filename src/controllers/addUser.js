const addUserModel = require("../models/addUser");

const addUser = (req, res) => {
  const { body } = req;
  addUserModel
    .addUser(body)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Penambahan User Berhasil",
        result: {
          ...result,
          password: "hidden"
        },
      });
    })
    .catch((status, err) => {
      res.status(status).json({ msg: "Terjadi Error", err });
    });
};

module.exports = { addUser };
