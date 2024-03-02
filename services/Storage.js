const multer = require("multer");

class Storage {
  static uploadFile() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage }).single("avatar");
    // Return the middleware function
    return upload;
  }
}

module.exports = { Storage };