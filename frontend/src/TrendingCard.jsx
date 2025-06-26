import styles from './TrendingCard.module.css';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function TrendingCard({ index, blog }) {

    return(
        <div className={styles["trending-card-container"]}>
            <img className={styles["trending-card-image"]} src={blog.image}alt="trending-card-image"></img>
            <div className={styles["overlay"]}>
                <span className={styles["post-number"]}>{index + 1}</span>
                <span className={styles["arrow"]}><FontAwesomeIcon icon={faLongArrowAltRight} /></span>
            </div>
            <div className={styles["text"]}>
                <h4 className={styles["title"]}><a href="#">{blog.title}</a></h4>
                <p className={styles["meta"]}>{new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            </div>
        </div>
    );
}

export default TrendingCard