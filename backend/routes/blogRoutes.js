import express from 'express';
import { getBlogs, postBlog, updateBlog, deleteBlog } from '../controller/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(postBlog);

router.route('/:id').put(updateBlog).delete(deleteBlog);

export default router