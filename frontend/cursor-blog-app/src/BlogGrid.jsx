import Blog from './Blog.jsx';
import { randomImage } from './Blog.jsx';
import styles from './BlogGrid.module.css';
import { useState } from 'react';
import { randomizer } from './EntryHeader.jsx';
import TrendingSection from './TrendingSection.jsx';
import AdBlog from './AdBlog.jsx';
import { ParallaxProvider } from 'react-scroll-parallax';



function createEntry() {
    const entry = randomizer();
    const image = randomImage(entry.category);
    return { ...entry, image };
}

function BlogGrid() {

    const [entries, setEntries] = useState(() =>
        Array.from({ length: 6 }, () => createEntry())
    );

    const [trendingEntries] = useState(() => 
        Array.from({ length: 4 }, () => createEntry())
    );

    const loadMore = () => {
        const newEntries = Array.from({ length: 3 }, () => createEntry());
        setEntries(e => [...e, ...newEntries]);
    }

    const sectionsCount = Math.floor(entries.length / 3);

    return(
        <div className={styles["blog-grid"]}>
            {[...Array(sectionsCount)].map((_, i) => (
                <div key={`section-group-${i}`}>
                    {entries.slice(i * 3, i * 3 + 3).map((entry, index) => (
                        <Blog key={i * 3 + index} entry={entry} />
                    ))}
                    <TrendingSection entries={trendingEntries} />
                </div>
            ))}

            {entries.length % 3 !== 0 && (entries.slice(sectionsCount * 3).map((entry, index) => (
                <Blog key={sectionsCount * 3 + index} entry={entry} />
            ))
        )}

            {/* {entries.slice(0, 3).map((entry, index) => (
                <Blog key={index} entry={entry} />
            ))}
            
            {showTrending ? (
                <TrendingSection />
            ) : (
                <TrendingSection />
            )}

            {entries.slice(3, entries.length).map((entry, index) => (
                <Blog key={index} entry={entry} />
            ))} */}
            <ParallaxProvider>
                <AdBlog />
            </ParallaxProvider>
            <div>
                <button onClick={loadMore}>Load More</button>
            </div>
        </div>
    );
}

export default BlogGrid