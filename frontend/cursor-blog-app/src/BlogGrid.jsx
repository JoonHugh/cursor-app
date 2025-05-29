import Blog from './Blog.jsx';
import styles from './BlogGrid.module.css';

function BlogGrid() {
    return(
        <div className={styles["blog-grid"]}>
            <Blog />
            <Blog />
            <Blog />
        </div>
    );
}

export default BlogGrid