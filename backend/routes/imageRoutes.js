import express from 'express';
import multer from 'multer';
import storage from '../middleware/cloudinaryStorage.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadProfileImage, uploadBlogImage  } from '../controllers/imageController.js'

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

const uploadProfile = multer({ profileStorage });
const uploadBlog = multer({ blogStorage });

router.post('/', uploadBlog.single('image'), protect, (req, res, next) => {
  console.log("Image upload request received");
  console.log("req.body:", req.body);
  console.log("req.body.filename:", req.body.filename)
  next();
}, uploadBlogImage);

router.post('/profile', uploadProfile.single('image'), protect, (req, res, next) => {
  console.log("Profile Image upload request received");
  console.log("req.body:", req.body);
  next();
}, uploadProfileImage);

// Blog image route (doesn't delete anything)
router.post('/blog', protect, uploadBlog.single('image'), (req, res, next) => {
  console.log("Blog Image upload request received");
  console.log("req.body:", req.body);
  next();
}, uploadBlogImage);


export default router;
