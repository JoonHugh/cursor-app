import { useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import styles from './BlogItem.module.css';
import { IoMdMore } from "react-icons/io";
import axios from 'axios';


function BlogItem({ blog }) {
    
    const [copySuccess, setCopySuccess] = useState('');
    const [confirm, setConfirm] = useState(false);

    const contentLines = blog.content.split('\n');
    const firstLines = contentLines.slice(0, 5).join('\n');
    
    // Truncate to 200 characters if it's too long
    const previewText = firstLines.length > 200
        ? firstLines.slice(0, 200) + "..."
        : firstLines;

    const url = "http://localhost:5000" + blog.image;
    const blogURL = "http://localhost:5001/blog/" + blog.slug;

    const dropdown = () => {
        console.log("CLICKED");
    }

    const handleCopy  = async () => {
        try {
            await navigator.clipboard.writeText(blogURL);
            setCopySuccess('Copied!')
            setConfirm(true);
            setTimeout(() => (setCopySuccess(''), setConfirm(false)), 2000);
        } catch (error) {
            console.error('Failed to copy text: ', err);
            setCopySuccess('Failed to copy!');
            setConfirm(false);
        }
    }

    const confirmDelete = () => {
        
    }

    return(
        <>
            {confirm && 
                <div className={styles["confirmed"]}>
                    <span className={styles["confirm-message"]}> 
                        Copied to clipboard!
                    </span>
                    <div className={`${styles["countdown"]} ${styles["animate"]}`}></div>
                </div>
            }
            <div className={styles["container"]}>
                <div className={styles["grid"]}>
                    <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                        <div className={styles["image-container"]}>
                            <img src={(blog.image) ? url : "/assets/interior2.jpg"} alt="blog-image"></img>
                        </div>
                    </a>
                    <div className={styles["preview-box"]}>
                        <div className={styles["top-grid"]}>
                            <div>
                                <img src={"/assets/defaultprofilepic.jpg"}></img>
                            </div>
                            <div className={styles["top"]}>
                                <span>{blog.user.name}</span>
                                <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} &nbsp; • &nbsp; {blog.readTime}</span>
                                <div className={styles["dropdown"]}>
                                    <button className={styles["more"]} onClick={dropdown}><IoMdMore /></button>
                                    <div className={styles["dropdown-content"]}>
                                        <a href={blogURL}><button>Go To Post</button></a>
                                        <button onClick={handleCopy}>Share</button>
                                        <button onClick={confirmDelete}>Delete</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                            <h3 className={styles["title"]}>{blog.title.length < 45 ? blog.title : blog.title.substring(0, 46) + "..."}</h3>
                        </a>
                        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                            <p className={styles["content"]}>{previewText}</p>
                        </a>
                        <div className={styles["bottom"]}>
                            <div className={styles["meta"]}>
                                <span className={styles["comments"]}>{Object.keys(blog.comments).length} comments</span>
                                <span className={styles["likes"]}>{blog.likes} likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogItem