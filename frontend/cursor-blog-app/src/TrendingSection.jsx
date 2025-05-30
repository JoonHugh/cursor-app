import TrendingCard from './TrendingCard.jsx';
import { randomizer } from './EntryHeader.jsx';
import { randomImage } from './Blog.jsx';
import styles from './TrendingSection.module.css';

function createEntry() {
    const entry = randomizer();
    const image = randomImage(entry.category);
    return { ...entry, image };
}

function TrendingSection({ entries }) {

    // const entries = Array.from({ length: 4 }, () => createEntry());

    return(
        <div className={styles["trending-posts-container"]}>
            <h5 className={styles["label"]}>TRENDING POSTS</h5>
            <div className={styles["trending-posts-grid"]}>
                {entries.map((entry, index) => (
                    <TrendingCard key={index} index={index} entry={entry}/>
                ))}
            </div>
        </div>
    );
}

export default TrendingSection