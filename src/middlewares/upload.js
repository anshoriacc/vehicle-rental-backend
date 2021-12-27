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

const maxFileSize = 2 * 1024 * 1024;

const multerOption = {
  storage,
  fileFilter: (req, file, cb) => {
    req.isPassFilter = true;
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb((req.isPassFilter = false));
    }
  },
  limits: { fileSize: maxFileSize },
};

const upload = multer(multerOption).single("profilePicture");
const multerHandler = (req, res, next) => {
  upload(req, res, (err) => {
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(500)
        .json({ errMsg: "Image file size exceeded limit(2MB)." });
    }
    next();
  });
};

module.exports = multerHandler;
