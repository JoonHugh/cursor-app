import express from 'express';
import { 
    getBlogs, 
    postBlog, 
    updateBlog, 
    deleteBlog, 
    updateBlogViews, 
    getTrending, 
    likeBlog, 
    getRecommended,
    addComment,
    getComments,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getBlogBySlug } from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(protect, getBlogs).post(protect, postBlog);

router.get('/:slug', getBlogBySlug);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);
router.put('/:id/views', updateBlogViews);
router.get('/api/trending', getTrending);
router.post('/:id/like', protect, likeBlog);
router.get('/user/:userId', getRecommended);
router.route('/:id/comment').post(protect, addComment).get(getComments);

export default router