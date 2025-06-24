import express from 'express';
import multer from 'multer';
import storage from '../middleware/cloudinaryStorage.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../controllers/imageController.js'

const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     const uploadPath = 'uploads/';
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const upload = multer({ storage });

router.post('/', upload.single('image'), protect, (req, res, next) => {
  console.log("Image upload request received");
  console.log("req.body:", req.body);
  console.log("req.body.filename:", req.body.filename)
  next();
}, uploadImage);

router.post('/profile', upload.single('image'), protect, (req, res, next) => {
  console.log("Profile Image upload request received");
  console.log("req.body:", req.body);
  next();
}, uploadImage);


export default router;
