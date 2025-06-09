import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Dashboard.module.css';
import BlogItem from '../src/BlogItem.jsx';
import BlogForm from '../src/BlogForm.jsx';
import Spinner from '../src/Spinner.jsx';
import { getBlogs, reset } from '../src/features/blogs/blogSlice.js';


function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getBlogs())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return(
        <div className={styles["container"]}>
            <h2 className={styles["page-name"]}>My Blog Posts</h2>
            <ul className={styles["page-nav"]}>
                <li><button>All posts</button></li>
                <li><button>Categories</button></li>
                <li><button>New post</button></li>
            </ul>
            <section className={styles["content"]}>
                {blogs.length > 0 ? (
                    <div className={styles["blog"]}>
                        {blogs.map((blog) => (
                            <BlogItem key = {blog._id} blog={blog}/>
                        ))}
                    </div>
                ) : (<h3>No blogs posted</h3>)

                }
            </section>
            <BlogForm />
        </div>
    );
}

export default Dashboard