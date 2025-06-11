import express from 'express';
import { getBlogs, postBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getBlogBySlug } from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(protect, getBlogs).post(protect, postBlog);

router.get('/:slug', getBlogBySlug);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

export default router