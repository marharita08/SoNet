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
  const fileTypes = ['image/png', 'image/jpeg', 'image/bmp'];
  if (fileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage: storageConfig, fileFilter });
