import styles from './BlogItem.module.css';

function BlogItem({ blog }) {

    const contentLines = blog.content.split('\n');
    const firstLines = contentLines.slice(0, 5).join('\n');
    
    // Truncate to 200 characters if it's too long
    const previewText = firstLines.length > 200
        ? firstLines.slice(0, 200) + "..."
        : firstLines;
    // lines = lines.slice(0, 5);

    const url = "http://localhost:5000" + blog.image;
    return(
        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
            <div className={styles["container"]}>
                <div className={styles["grid"]}>
                    <div className={styles["image-container"]}>
                        <img src={(blog.image) ? url : "/assets/interior2.jpg"} alt="blog-image"></img>
                    </div>
                    <div className={styles["preview-box"]}>
                        <div className={styles["top-grid"]}>
                            <div>
                                <img src={"/assets/defaultprofilepic.jpg"}></img>
                            </div>
                            <div className={styles["top"]}>
                                <span>{blog.user.name}</span>
                                <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} &nbsp; • &nbsp; {blog.readTime}</span>
                            </div>
                        </div>
                        <h3 className={styles["title"]}>{blog.title.length < 36 ? blog.title : blog.title.substring(0, 37) + "..."}</h3>
                        <p className={styles["content"]}>{previewText}</p>
                        <div className={styles["bottom"]}>
                            <div className={styles["meta"]}>
                                <span className={styles["comments"]}>{Object.keys(blog.comments).length - 1} comments</span>
                                <span className={styles["likes"]}>{blog.likes} likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default BlogItem