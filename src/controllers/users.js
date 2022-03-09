const userModel = require('../models/users');
const resHelper = require('../helpers/response');

const detailUser = (req, res) => {
  const {userInfo} = req;
  const userId = userInfo.id;
  userModel
    .detailUser(userId)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch(({status, err}) => {
      return resHelper.error(res, status, err);
    });
};

const editUser = (req, res) => {
  const {body, userInfo, file} = req;
  const userId = userInfo.id;
  let newBody;

  if (file) {
    newBody = {
      ...body,
      photo: file.path.slice(7),
    };
  } else {
    newBody = {...body};
  }

  userModel
    .editUser(userId, newBody)
    .then(({status, result}) => {
      return resHelper.success(res, status, result);
    })
    .catch((status, err) => {
      return resHelper.error(res, status, err);
    });
};

// const addUser = (req, res) => {
//   const {body} = req;
//   userModel
//     .addUser(body)
//     .then(({status, result}) => {
//       return resHelper.success(res, status, result);
//     })
//     .catch(({status, err}) => {
//       return resHelper.error(res, status, err);
//     });
// };

// const deleteUser = (req, res) => {
//   const {params} = req;
//   const userId = params.id;
//   userModel
//     .deleteUser(userId)
//     .then(({status, result}) => {
//       res.status(status).json({
//         msg: `Penghapusan User dengan id = ${userId} berhasil`,
//       });
//     })
//     .catch((status, err) => {
//       res.status(status).json({errMsg: 'Terjadi Error', err});
//     });
// };

module.exports = {
  detailUser,
  editUser,
};
