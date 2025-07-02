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
    fetchFeatured,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getBlogBySlug } from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(protect, getBlogs).post(protect, postBlog);

router.get('/featured', fetchFeatured);
router.get('/api/trending', getTrending);
router.get('/user/:userId', getRecommended);
router.get('/:slug', getBlogBySlug);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);
router.put('/:id/views', updateBlogViews);
router.post('/:id/like', protect, likeBlog);
router.route('/:id/comment').post(protect, addComment).get(getComments);

export default router