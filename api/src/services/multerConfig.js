const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.params.id}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/bmp'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage: storageConfig, fileFilter });
