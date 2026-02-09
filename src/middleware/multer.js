import multer from 'multer';
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const fileType = ['image/jpeg', 'image/jpg', 'image/png'];
    if (fileType.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only images allowed'));
    }
  },
});
