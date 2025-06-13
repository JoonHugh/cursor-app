import { useState, useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Dashboard.module.css';
import BlogItem from '../src/BlogItem.jsx';
import BlogForm from '../src/BlogForm.jsx';
import Spinner from '../src/Spinner.jsx';
import { getBlogs, reset } from '../src/features/blogs/blogSlice.js';
import { createBlog } from '../src/features/blogs/blogSlice.js';



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
            <div className={styles["nav-container"]}>
                <nav className={styles["page-nav"]}>
                {['All posts', 'Categories', 'New post'].map((label, i) => (
                        <li
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            ref={(el) => (navRefs.current[i] = el)}
                            style={{ color: i === activeIndex ? 'rgb(255, 182, 87)' : 'black' }}
                        >
                            {label}
                        </li>
                    ))}
                    <span style={spanStyle}></span>
                </nav>
            </div>
            
            <div>
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
                            <h2>CHECK AIRBNB'S FILTER OPTIONS FOR INSPIRATION</h2>
                            <img src="https://www.google.com/imgres?q=blog%20entry%20form%20ui%20ux&imgurl=https%3A%2F%2Fassets.ycodeapp.com%2Fassets%2Fapp13650%2Fimages%2Fe1kc60y4R0mPs5YRRD2Nzdg26Li7ah8X9YR3OtgH-published.webp&imgrefurl=https%3A%2F%2Fwww.ycode.com%2Ftemplates%2Fpersonal-blog&docid=zSIJP3in44ZePM&tbnid=MjecTtcsPv9GqM&vet=12ahUKEwiipMPH9eWNAxVbrlYBHeMTLr0QM3oECFMQAA..i&w=2672&h=1200&hcb=2&ved=2ahUKEwiipMPH9eWNAxVbrlYBHeMTLr0QM3oECFMQAA" alt="inspiration-image"/>
                        </div>
                    )}

                    {activeIndex === TABS.NEW_POST && (
                        <BlogForm
                            onSubmitHandler={(blogData) => dispatch(createBlog(blogData))}
                        />

                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard