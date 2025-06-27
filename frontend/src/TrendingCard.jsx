import styles from './TrendingCard.module.css';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function TrendingCard({ index, blog }) {

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
                    <h4 className={styles["title"]}><a href="#">{blog.title}</a></h4>
                    <p className={styles["meta"]}>{new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                </a>
            </div>
    );
}

export default TrendingCard