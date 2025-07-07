import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { EntryHeader } from './EntryHeader.jsx';
import ShareGrid from './ShareGrid.jsx';
import styles from './Blog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import removeMd from 'remove-markdown';

// import {}

export function randomImage(category) {
    const imageMap = {
        LIFESTYLE: ['lifestyle1.jpg', 'lifestyle2.jpg', 'lifestyle3.jpg', 'lifestyle4.jpg', 'lifestyle5.jpg', 'lifestyle6.jpg', 'lifestyle7.jpg', 'lifestyle8.jpg', 'lifestyle9.jpg'],
        INTERIOR: ['interior1.jpg', 'interior2.jpg', 'interior3.jpg', 'interior3.jpg', 'interior4.jpg', 'interior5.jpg', 'interior6.jpg', 'interior7.jpg', 'interior8.jpg', 'interior9.jpg', 'interior10.jpg', 'interior11.jpg', 'interior12.jpg', 'interior13.jpg', 'interior14.jpg'],
        STYLE: ['style1.jpg', 'style2.jpg', 'style3.jpg', 'style4.jpg', 'style5.jpg', 'style6.jpg', 'style7.jpg', 'style8.jpg', 'style9.jpg', 'style10.jpg', 'style11.jpg'],
        TRAVEL: ['travel1.jpg', 'travel2.jpg', 'travel3.jpg', 'travel4.jpg', 'travel5.jpg', 'travel6.jpg', 'travel7.jpg', 'travel8.jpg', 'travel9.jpg', 'travel10.jpg']
    };

    const images = imageMap[category];
    if (!images) return null;

    const randomIndex = Math.floor(Math.random() * images.length);
    return `./assets/${images[randomIndex]}`
} // randomImage

export function views(entry) {
    if (entry.views < 1000) return parseInt(entry.views) + ' VIEWS';
    
    const roundedViews = Math.round((entry.views / 1000) * 10) / 10;
    return roundedViews + 'K VIEWS';
}

function Blog({ entry }) {
    
    const DEBUG = import.meta.env.DEBUG;

    if (DEBUG) console.log(entry);

    const blogLink = "/blog/" + entry.slug;
    return(
        <div className={styles["blog"]}>
            <div className={styles["blog-grid-row"]}>
                <a href={blogLink} className={styles["image-container"]}>
                    <img className={styles["entry-image"]} src={entry.image} alt="blog preview"></img>
                    <div className={styles["hover-text"]}>
                        <span className={styles["go-to-post"]}>VIEW POST <FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                        <span className={styles["post-meta"]}>{views(entry)} • {entry.readTime.toUpperCase()}</span>
                    </div>
                </a>
                <div className={styles["preview-column"]}>
                    <div className={styles["entry-header"]}>
                        <EntryHeader entry={entry} />
                    </div>
                    <div className={styles["post-excerpt"]}>
                        <p>{removeMd(entry.content.replace(/\n+/g, '\n').trim())}</p>
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