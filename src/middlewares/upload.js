const multer = require("multer");
const path = require("path");

const maxFileSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/profile/");
  },
  filename: (req, file, cb) => {
    const format = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, format);
  },
});

const multerOptions = {
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".png" || ext == ".jpg" || ext == ".jpeg") {
      return cb(null, true);
    } else {
      // return cb(null, false);
      const err = new Error("Only .png / .jpg / .jpeg files allowed.");
      err.code = "WRONG_EXTENSION";
      return cb(err);
    }
  },
  limits: { fileSize: maxFileSize },
};

const upload = multer(multerOptions).single("profilePicture");
const multerHandler = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          err: err.code,
          errMsg: "Image file size exceeded limit(2MB).",
        });
      }
      if (err.code === "WRONG_EXTENSION") {
        return res.status(400).json({
          err: err.code,
          errMsg: "Only .png / .jpg / .jpeg files allowed.",
        });
      }
      return res.status(500).json({
        errMsg: "Error occurred",
        err,
      });
    }
    next();
  });
};

module.exports = multerHandler;
