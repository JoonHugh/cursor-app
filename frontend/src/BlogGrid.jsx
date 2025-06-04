import styles from './BlogGrid.module.css';
import Blog from './Blog.jsx';
import AdBlog from './AdBlog.jsx';
import Subscribe from './Subscribe.jsx';
import BlogSection from './BlogSection.jsx';
import TrendingSection from './TrendingSection.jsx';
import { useState } from 'react';
import { randomizer } from './EntryHeader.jsx';
import { randomImage } from './Blog.jsx';
import { ParallaxProvider } from 'react-scroll-parallax';



export function createEntry() {
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

    const [sectionIndex, setSectionIndex] = useState(0);

    const sectionComponents = [
        <TrendingSection entries={trendingEntries} />,
        <ParallaxProvider><AdBlog /></ParallaxProvider>,
        <Subscribe />,
        <BlogSection />
    ];

    const loadMore = () => {
        const newEntries = Array.from({ length: 3 }, () => createEntry());
        setEntries(e => [...e, ...newEntries]);
        setSectionIndex(i => (i + 1) % sectionComponents.length);
    };

    const blocks = [];
    
    for (let i = 0; i < Math.floor(entries.length / 3); i++) {
        const blogs = entries.slice(i * 3, i * 3 + 3);
        blocks.push(
            <div key={`block-${i}`}>
                {blogs.map((entry, idx) => (
                    <Blog key={i * 3 + idx} entry={entry} />
                ))}
                {sectionComponents[i % sectionComponents.length]}
            </div>
        );
    }

    // Any leftover blogs
    const remainder = entries.length % 3;
    const leftover = remainder > 0
        ? entries.slice(entries.length - remainder).map((entry, idx) => (
            <Blog key={`leftover-${idx}`} entry={entry} />
        ))
        : null;

    return (
        <div className={styles["blog-grid"]}>
            {blocks}
            {leftover}
            <div style={{ marginTop: "2rem" }}>
                <button onClick={loadMore}>Load More</button>
            </div>
        </div>
    );
}


export default BlogGrid