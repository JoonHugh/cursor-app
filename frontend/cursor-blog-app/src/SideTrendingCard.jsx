import styles from './SideTrendingCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

function SideTrendingCard({ index, entry }) {

    const categoryLink = "/category/" + entry.category;
    const titleLink = "/title/" + entry.title;
    const nameLink = "/author/" + entry.name;
    

    return(
        <div className={styles["grid"]}>
            <a className={styles["image-container"]} href="link-to-blog">
                <img className={styles["image"]} src={entry.image}></img>
                <div className={styles["index"]}>
                    <span className={styles["number"]}>{index + 1}</span>
                    <span className={styles["arrow"]}><FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                </div>
            </a>
            <div className={styles["text-meta"]}>
                <div className={styles["category-link"]}>
                    <a href={categoryLink}>{entry.category}</a>
                </div>
                <div className={styles["title-link"]}>
                    <a href={titleLink}>{entry.title}</a>
                </div>
                <div className={styles["blog-meta"]}>
                    <a className={styles["name-link"]} href={nameLink}>{entry.name}</a> • <span className={styles["date"]}>JUNE 2025</span>
                </div>
            </div>
        </div>
    );
} // SideTrendingCard

export default SideTrendingCard