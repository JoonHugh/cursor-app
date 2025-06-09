import styles from './BlogItem.module.css';
import { CgProfile } from "react-icons/cg";


function BlogItem({ blog }) {
    return(
        <div className={styles["container"]}>
            <div className={styles["grid"]}>
                <div className={styles["image-container"]}>
                    <img src="/assets/interior2.jpg" alt="blog-image"></img>
                </div>
                <div className={styles["preview-box"]}>
                    <div className={styles["top-grid"]}>
                        <div>
                            <img src="/assets/defaultprofilepic.jpg"></img>
                        </div>
                        <div className={styles["top"]}>
                            <span>{blog.user}</span>
                            <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} &nbsp; • &nbsp; {blog.readTime}</span>
                        </div>
                    </div>
                    <h3 className={styles["title"]}>{blog.title.length < 70 ? blog.title : blog.title.substring(0, 70) + "..."}</h3>
                    <p className={styles["content"]}>{blog.content.length < 201 ? blog.content : blog.content.substring(0, 236) + "..."}</p>
                    <div className={styles["bottom"]}>
                        <div className={styles["meta"]}>
                            <span className={styles["comments"]}>{Object.keys(blog.comments).length - 1} comments</span>
                            <span className={styles["likes"]}>{blog.likes} likes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem