const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
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
  limits: {
    filesize: 1024 * 1024,
  },
};

module.exports = multer(multerOptions);
