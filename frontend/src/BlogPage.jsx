import styles from './BlogPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import SideBar from './SideBar.jsx';
import MDEditor from "@uiw/react-md-editor";

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
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);


    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // flag
        
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/blogs/${slug}`);
                // console.log("RES DATA:", res.data);
                
                if (!res.data.published) {
                    if (!user || user._id !== res.data.user._id) {
                        setUnauthorized(true);
                        setLoading(false);
                        return;
                    }
                }
                
                if (isMounted) {
                    setBlog(res.data);

                    // Only update views if this is the first mount
                    if (!localStorage.getItem(`viewed-${slug}`)) {
                        const newPageViews = (res.data.views || 0) + 1;

                        // Mark as viewed before making the request
                        localStorage.setItem(`viewed-${slug}`, 'true');

                        try {
                            await axios.put(
                                `http://localhost:5000/blogs/${res.data._id}/views`,
                                { views: newPageViews },
                                {
                                    headers: {
                                        Authorization: `Bearer ${user?.token}`,
                                    },
                                }
                            );
                            setPageViews(newPageViews);
                        } catch (error) {
                            console.error("Failed to update views:", error);
                            localStorage.removeItem(`viewed-${slug}`);
                        }
                    } else {
                        setPageViews(res.data.views || 0);
                    }
                }
            } catch (error) {
                console.error("Blog not found", error);
                // navigate('not-found');
            } finally {
                // setLoading(false);
                if (isMounted) setLoading(false);
            } // try-catch-finally
        } // fetchBlog

        fetchBlog();

        return () => {
            isMounted = false;
        };
    }, [slug, user, navigate]);

    if (loading) return
    (
    <>
        <div className={styles["loading-container"]}>
            <h1>Loading...</h1>
        </div>
    </>
    )
    if (unauthorized) return <PrivatePostMessage />;
    if (!blog) return (
    <div className={styles["not-found"]}>
        <h1>404</h1>
        <p>Blog not found</p>
        <button onClick={() => window.location.href = '/'}>
            Return Home
        </button>
    </div>
    );

    return(
        <div>
            <div className={styles["hero-section"]}>
                <div className={styles["image-container"]}>
                    <img className={styles["image"]} src={url + blog.image} alt="hero-image"></img>
                        <div className={styles["hero-container"]}>
                            <div className={styles["box"]}>
                                <span className={styles["category"]}>{blog.category}</span>
                                <h1 className={styles["title"]}>{blog.title}</h1>
                                <div className={styles["meta"]}>
                                <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span> • <span>{blog.user.name}</span>  • {blog.published ? (<span>{pageViews} Views</span>) : (<span>Private Post</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["container"]}>
                <div className={styles["markdown-container"]}>
                    <div className={styles["markdown-content"]}>
                        <MDEditor.Markdown source={blog.content} className={styles["markdown-preview"]} />
                    </div>
                </div>
                <div className={styles["side-bar"]}>
                    <SideBar className={styles["SideBar"]} images={images}/>
                </div>
            </div>
        </div>
    ) // return

    // Separate component for unauthorized message
    function PrivatePostMessage() {
        return (
            <div className={styles["private-post-message"]}>
                <h1>This post is private</h1>
                <p>Only the author can view this content.</p>
                <button onClick={() => window.location.href = '/'}>
                    Return Home
                </button>
            </div>
        );
    }


} // BlogPage

export default BlogPage