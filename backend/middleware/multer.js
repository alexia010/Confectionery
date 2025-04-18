import multer from 'multer';
import constants from '../utils/constants.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, constants.IMAGE_UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg', 
      'image/jpg', 
      'image/png', 
      'image/gif', 
      'image/webp'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      return cb(new Error('Fișierul trebuie să fie o imagine!'), false);
    }
  },
  limits: { fileSize:constants.MAX_FILE_SIZE } // Limita de 5MB
});

export default upload;