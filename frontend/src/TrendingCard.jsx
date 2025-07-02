import styles from './TrendingCard.module.css';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@mui/material';


function TrendingCard({ index, blog }) {

    const isMobile = useMediaQuery('(max-width:768px)');


    return(
        <div className={styles["trending-card-container"]}>
                <a href={`blog/${blog.slug}`}>
                    <img className={styles["trending-card-image"]} src={blog.image} alt="trending-card-image"></img>
                </a>
                <div className={styles["overlay"]}>
                    <span className={styles["post-number"]}>{index + 1}</span>
                    <span className={styles["arrow"]}><FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                </div>
                <a className={styles["text"]} href={`blog/${blog.slug}`}>
                    <div className={styles["blog-info"]}>
                        <p className={styles["title"]}>{blog.title}</p>
                            {isMobile && (
                                <div className={styles["info"]}>
                                    <p>{blog.user.username}</p>
                                    <p>{blog.category}</p>
                                </div>
                            )}
                    </div>
                        <div>
                            <p className={styles["meta"]}>{new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                            <p className={styles["meta"]}>{blog.readTime}</p>
                        </div>
                </a>
            </div>
    );
}

export default TrendingCard