import styles from './SideTrendingCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

function SideTrendingCard({ index, blog }) {

    const categoryLink = "/blog/" + blog.slug;
    const titleLink = "/blog/" + blog.slug;
    const nameLink = "/blog/" + blog.slug;

    return(
        <div className={styles["grid"]}>
            <a className={styles["image-container"]} href="link-to-blog">
                <img className={styles["image"]} src={blog.image}></img>
                <div className={styles["index"]}>
                    <span className={styles["number"]}>{index + 1}</span>
                    <span className={styles["arrow"]}><FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                </div>
            </a>
            <div className={styles["text-meta"]}>
                <div className={styles["category-link"]}>
                    <a href={categoryLink}>{blog.category}</a>
                </div>
                <div className={styles["title-link"]}>
                    <a href={titleLink}>{blog.title}</a>
                </div>
                <div className={styles["blog-meta"]}>
                    <a className={styles["name-link"]} href={nameLink}>{blog.user?.username}</a> • <span className={styles["date"]}>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                </div>
            </div>
        </div>
    );
} // SideTrendingCard

export default SideTrendingCard