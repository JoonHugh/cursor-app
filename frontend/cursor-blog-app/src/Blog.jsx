import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { EntryHeader, randomizer } from './EntryHeader.jsx';
import ShareGrid from './ShareGrid.jsx';
import styles from './Blog.module.css';

function randomImage(category) {
    const imageMap = {
        LIFESTYLE: ['lifestyle1.jpg', 'lifestyle2.jpg', 'lifestyle3.jpg', 'lifestyle4.jpg', 'lifestyle5.jpg'],
        INTERIOR: ['interior1.jpg', 'interior2.jpg', 'interior3.jpg'],
        STYLE: ['style1.jpg', 'style2.jpg', 'style3.jpg'],
        TRAVEL: ['travel1.jpg', 'travel2.jpg', 'travel3.jpg']
    };

    const images = imageMap[category];
    if (!images) return null;

    const randomIndex = Math.floor(Math.random() * images.length);
    return `./assets/${images[randomIndex]}`
} // randomImage

function randomViews() {
    const views = Math.floor(Math.random() * 10000);
    if (views < 1000) return parseInt(views) + ' VIEWS';
    
    const roundedViews = Math.round((views / 1000) * 10) / 10;
    return roundedViews + 'K VIEWS';
}

function readTime() {
    // calculate later
    return '2 MINUTE READ';
}

function Blog() {
    const entry = randomizer();
    return(
        <div className={styles["blog"]}>
            <div className={styles["blog-grid-row"]}>
                <div className={styles["image-container"]}>
                    <img className={styles["entry-image"]} src={randomImage(entry.category)} alt="blog preview"></img>
                    <div className={styles["hover-text"]}>
                        <span className={styles["go-to-post"]}>VIEW POST <FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                        <span className={styles["post-meta"]}>{randomViews()} • {readTime()}</span>
                    </div>
                </div>
                <div className={styles["preview-column"]}>
                    <div className={styles["entry-header"]}>
                        <EntryHeader entry={entry} />
                    </div>
                    <div className={styles["post-excerpt"]}>
                        <p>Structured gripped tape invisible moulded cups for suppor firm hold strong powermesh front liner sport detail. Warmth comfort hangs loosely from the body large pocket at the front full button...</p>
                    </div>
                    <div className={styles["post-share"]}>
                        <ShareGrid />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Blog