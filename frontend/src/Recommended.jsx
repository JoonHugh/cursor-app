import styles from './Recommended.module.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommended } from './features/blogs/blogSlice.js';

function Recommended({ blog }) {

    const dispatch = useDispatch();
    const { recommendedBlogs, isLoading, isError, message } = useSelector(state => state.blogs);

    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth >= 1020 ? 3 : 2);

    useEffect(() => {
        if (blog.user?._id && blog?._id) {
            dispatch(fetchRecommended({ userId: blog.user._id, excludeId: blog._id, tags: blog.tags.join(','), category: blog.category }))
        }
    }, [blog, dispatch]);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 1020 ? 3 : 2);
        } // handleResize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleScroll = () => {
        if (!carouselRef.current) return;

        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;

        const index = Math.round(scrollLeft / containerWidth);
        setActiveIndex(index);
    }

    const scrollToIndex = (index) => {
        if (!carouselRef.current) return;

        const containerWidth = carouselRef.current.offsetWidth;
        carouselRef.current.scrollTo({
            left: index * containerWidth,
            behavior: 'smooth',
        });
    }

    const totalDots = Math.ceil((recommendedBlogs?.length || 0) / itemsPerPage);

    return (
        <>
            <p className={styles["section-title"]}>You may also like</p>
            {/* <div className={styles["carousel"]}> */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {message}</p>}

            <div className={styles["carousel-container"]} onScroll={handleScroll} ref={carouselRef}>
                <div className={styles["carousel"]}>
                    {Array.isArray(recommendedBlogs) && recommendedBlogs.map((blog) => (
                        <a href={`/blog/${blog.slug}`} className={styles["carousel-item"]} key={blog._id}>
                            <div className={styles["image-container"]}>
                                <img
                                    src={blog.image || "/assets/interior2.jpg"}
                                    alt="blog"
                                    className={styles["carousel-image"]}
                                />
                            </div>
                            <span className={styles["category"]}>{blog.category}</span>
                            <span className={styles["title"]}>{blog.title}</span>
                            <div className={styles["meta"]}>
                                <span className={styles["user"]}>{blog.user?.username}</span> • <span className={styles["date"]}>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            
            <div className={styles["dots"]}>
                {Array.from({length : totalDots }).map((_, i) => (
                    <span
                        key={i}
                        onClick={() => scrollToIndex(i)}
                        className={`${styles["dot"]} ${i === activeIndex ? styles["active"] : ""}`}
                    />
                ))}
            </div>
        </>
    );
}

            export default Recommended