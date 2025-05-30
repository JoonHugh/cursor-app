import Blog from './Blog.jsx';
import { randomImage } from './Blog.jsx';
import styles from './BlogGrid.module.css';
import { useState } from 'react';
import { randomizer } from './EntryHeader.jsx';
import TrendingPosts from './TrendingPosts.jsx';


function createEntry() {
    const entry = randomizer();
    const image = randomImage(entry.category);
    return { ...entry, image };
}

function BlogGrid() {

    const [entries, setEntries] = useState(() =>
        Array.from({ length: 3 }, () => createEntry())
    );

    const loadMore = () => {
        const newEntries = Array.from({ length:3 }, () => createEntry());
        setEntries(e => [...e, ...newEntries]);
    }

    return(
        <div className={styles["blog-grid"]}>
            {entries.map((entry, index) => (
                <Blog key={index} entry={entry} />
            ))}
            <TrendingPosts entry={entry}/>
            <div>
                <button onClick={loadMore}>Load More</button>
            </div>
        </div>
    );
}

export default BlogGrid