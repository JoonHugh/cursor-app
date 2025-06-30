import styles from './Recommended.module.css'
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommended } from './features/blogs/blogSlice.js';

function Recommended({ blog }) {

    const dispatch = useDispatch();
    const { recommendedBlogs, isLoading, isError, message } = useSelector(state => state.blogs);

    useEffect(() => {
        if (blog.user?._id && blog?._id) {
            dispatch(fetchRecommended({ userId: blog.user._id, excludeId: blog._id, tags: blog.tags.join(','), category: blog.category }))
        }
    }, [blog, dispatch]);

    return(
        <div className={styles["grid-container"]}>
            <p className={styles["section-title"]}>You may also like</p>
            <div className={styles["carasol"]}>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {message}</p>}
                {Array.isArray(recommendedBlogs) && recommendedBlogs.map((blog) => (
                    <div className={styles["image-container"]} key={blog._id}>
                        <img src={blog.image} alt="blog-image" />
                        <span className={styles["category"]}>{blog.category}</span>
                        <span className={styles["title"]}>{blog.title}</span>
                        <div className={styles["meta"]}>
                            <span className={styles["user"]}>{blog.user.username}</span>
                            <span className={styles["date"]}>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Recommended