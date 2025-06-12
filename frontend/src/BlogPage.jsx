import styles from './BlogPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import SideBar from './SideBar.jsx';

function BlogPage() {

    const url = `http://localhost:5000`;

    const images = [
        '/assets/insta1.png',
        '/assets/insta2.png',
        '/assets/insta3.png',
        '/assets/insta4.png',
        '/assets/insta5.png',
        '/assets/insta6.png'
    ];

    const {slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        const storedPageViews = localStorage.getItem('pageViews');

        if (storedPageViews) {
            setPageViews(parseInt(storedPageViews, 10));
        } // if
        setPageViews(async (prevPageViews) => {
            const newPageViews = prevPageViews + 1;
            localStorage.setItem('pageViews', newPageViews.toString());
            console.log("page view", newPageViews)
            // const res = await axios.patch(`http://localhost:5000/blogs/${slug}`, blog)
            return newPageViews;
        }) // storedPageViews

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/blogs/${slug}`);
                setBlog(res.data);
            } catch (error) {
                console.error("Blog not found", error);
            } // try-catch
        } // fetchBlog

        fetchBlog();
    }, [slug]);

    if (!blog) return <p>Loading...</p>

    return(
        <>
            {blog.published ? (
                <div>
                    <div className={styles["hero-section"]}>
                        <div className={styles["image-container"]}>
                            <img className={styles["image"]} src={url + blog.image} alt="hero-image"></img>
                            <div className={styles["hero-container"]}>
                                <div className={styles["box"]}>
                                    <span className={styles["category"]}>{blog.category}</span>
                                    <h1 className={styles["title"]}>{blog.title}</h1>
                                    <div className={styles["meta"]}>
                                        <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span> • <span>{blog.user.name}</span>  • <span>{pageViews} Views</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["container"]}>
                        <div className={styles["markdown-container"]}>
                            <div className={styles["markdown-content"]}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
                            </div>
                        </div>
                        <div className={styles["side-bar"]}>
                            <SideBar className={styles["SideBar"]} images={images}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Private Blog Post</h1>
                </div>
            )}
        </>
    ) // return
} // BlogPage

export default BlogPage