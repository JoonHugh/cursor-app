import styles from './BlogSection.module.css';
import ShareGrid from './ShareGrid.jsx';

function BlogSection() {
    return(
        <div className={styles["entry-container2"]}>
                    <video className={styles["blog-video"]} autoPlay muted loop playsInline preload>
                        <source src="/assets/blogvid.mp4" type="video/mp4" ></source>
                    </video>
                    <div className={styles["hover-text"]}>
                        <span className={styles["category"]}>TRAVEL</span>
                        <span className={styles["title"]}>How to Finally Travel Slowly Without Feeling Guilty</span>
                        <div className={styles["share-grid"]}>
                            <ShareGrid color="white"/>
                        </div>
                        <div className={styles["meta-info"]}>
                            <span>JOANNA WELLICK</span> • <span>MAY, 2024</span> • <span>NO COMMENTS</span>
                        </div>
                    </div>
                </div>
    );
}

export default BlogSection