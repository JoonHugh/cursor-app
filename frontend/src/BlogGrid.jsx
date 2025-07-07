import styles from './BlogGrid.module.css';
import Blog from './Blog.jsx';
import AdBlog from './AdBlog.jsx';
import Subscribe from './Subscribe.jsx';
import BlogSection from './BlogSection.jsx';
import TrendingSection from './TrendingSection.jsx';
import { useEffect, useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeBlogs } from './features/blogs/blogSlice.js';

function BlogGrid() {

    const [entries, setEntries] = useState([]);

    const DEBUG = import.meta.env.DEBUG;

    const { featured } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    const [displayedIds, setDisplayedIds] = useState(() => featured.map(b => b._id)); // start with featured

    useEffect(() => {
        const excludeParam = featured.map(b => b._id).join(',');
        
        dispatch(getHomeBlogs({ exclude: excludeParam, limit: 6 }))
            .unwrap()
            .then((blogs) => {
                const newIds = blogs.map(b => b._id);
                setDisplayedIds(prev => [...new Set([...prev, ...newIds])]);
                if (DEBUG) console.log(blogs);
                setEntries(blogs); // Start with 6 blogs
            });
    }, [dispatch, featured]);


    const [sectionIndex, setSectionIndex] = useState(0);

    const sectionComponents = [
        <TrendingSection />,
        <ParallaxProvider><AdBlog /></ParallaxProvider>,
        <Subscribe />,
        <BlogSection />
    ];

    const loadMore = () => {
        const excludeParam = displayedIds.join(',');

        dispatch(getHomeBlogs({ exclude: excludeParam }))
            .unwrap()
            .then((newBlogs) => {
                const newIds = newBlogs.map(blog => blog._id);
                setDisplayedIds(prev => [...new Set([...prev, ...newIds])]);
                setEntries(prev => [...prev, ...newBlogs]);
                if (DEBUG) console.log(newBlogs);
                setSectionIndex(i => (i + 1) % sectionComponents.length);
            })
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