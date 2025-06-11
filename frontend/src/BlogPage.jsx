import styles from './BlogPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
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

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/blogs/${slug}`);
                setBlog(res.data);
            } catch (error) {
                console.error("Blog not found", error);
                // <div></div>
            }
        }

        fetchBlog();
    }, [slug]);

    if (!blog) return <p>Loading...</p>

    return(
        <>
            <div className={styles["hero-section"]}>
                <div className={styles["image-container"]}>
                    <img className={styles["image"]} src={url + blog.image} alt="hero-image"></img>
                    <span className={styles["category"]}>{blog.category}</span>
                    <h1 className={styles["title"]}>{blog.title}</h1>
                    <div className={styles["meta"]}>
                        <span>{blog.createdAt}</span>  • <span>{blog.user}</span>

                    </div>
                </div>
            </div>
            <div className={styles["container"]}>
                <div className={styles["markdown-container"]}>
                    <p className={styles["markdown-content"]}>
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </p>
                </div>
                <div className={styles["side-bar"]}><SideBar className={styles["SideBar"]} images={images}/></div>
            </div>
        </>
    ) // return
} // BlogPage

export default BlogPage