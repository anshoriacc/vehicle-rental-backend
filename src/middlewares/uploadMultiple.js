const multer = require("multer");
const path = require("path");

const maxFileSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/vehicle/");
  },
  filename: (req, file, cb) => {
    const format = `vehicle-${Date.now()}${path.extname(file.originalname)}`;
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
      return cb(null, false);
    }
  },
  limits: { fileSize: maxFileSize },
};

