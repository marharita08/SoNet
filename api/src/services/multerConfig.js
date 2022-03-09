const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const { 'file-destination': fileDestination } = req.headers;
    cb(null, `public/images/${fileDestination}`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.user_id}-${Date.now()}.${ext}`);
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
