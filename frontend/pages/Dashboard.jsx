import { useState, useEffect, useRef } from 'react';
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

    const [activeIndex, setActiveIndex] = useState(0);
    const navRefs = useRef([]);

    const TABS = {
        ALL: 0,
        CATEGORIES: 1,
        NEW_POST: 2,
    };

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

    // Calculate span position/size
    const activeLi = navRefs.current[activeIndex];
    const spanStyle = activeLi
        ? {
              left: activeLi.offsetLeft,
              width: activeLi.offsetWidth,
          }
        : {};

    return(
        <div className={styles["container"]}>
            <h2 className={styles["page-name"]}>My Blog Posts</h2>
            <nav className={styles["page-nav"]}>
            {['All posts', 'Categories', 'New post'].map((label, i) => (
                    <li
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        ref={(el) => (navRefs.current[i] = el)}
                        style={{ color: i === activeIndex ? 'white' : 'black' }}
                    >
                        {label}
                    </li>
                ))}
                <span style={spanStyle}></span>
            </nav>

            <section className={styles["content"]}>
                {activeIndex === TABS.ALL && (      
                    blogs.length > 0 ? (
                        <div className={styles["blog"]}>
                        {blogs.map((blog) => (
                            <BlogItem key = {blog._id} blog={blog}/>
                        ))}
                        </div>
                    ) : (<h3>No blogs posted</h3>)
                    
                
                )}

                {activeIndex === TABS.CATEGORIES && (      
                    <div>
                        <h3>Categories</h3>
                    </div>
                )}

                {activeIndex === TABS.NEW_POST && (
                    <BlogForm />
                )}
            </section>
        </div>
    );
}

export default Dashboard