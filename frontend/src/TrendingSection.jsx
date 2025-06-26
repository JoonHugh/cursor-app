import TrendingCard from './TrendingCard.jsx';
import { randomizer } from './EntryHeader.jsx';
import { randomImage } from './Blog.jsx';
import styles from './TrendingSection.module.css';
import  { useDispatch } from 'react-redux';
import {useState, useEffect } from 'react';
import axios from 'axios';

function createEntry() {
    const entry = randomizer();
    const image = randomImage(entry.category);
    return { ...entry, image };
}

function TrendingSection({ entries }) {


    const DEBUG = import.meta.env.DEBUG;

    const API_BLOG = import.meta.env.VITE_BLOG_API_URL;


    const [trendingBlogs, setTrendingBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingBlogs = async () => {
            try {
                const res = await axios.get(`${API_BLOG}api/trending`);
                if (DEBUG) console.log("API Response:", res.data); // 👈 Debug the response
                setTrendingBlogs(res.data.slice(0, 4));
                if (DEBUG) console.log("TRENDING BLOGS", res.data.slice(0, 4));
            } catch (error) {
                if (DEBUG) console.error("Failed to get trending blogs", error);
                setTrendingBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingBlogs();
    }, [])

    return(
        <div className={styles["trending-posts-container"]}>
            <h5 className={styles["label"]}>TRENDING POSTS</h5>
            <div className={styles["trending-posts-grid"]}>
                {trendingBlogs.map((blog, index) => (
                    <TrendingCard key={index} index={index} blog={blog}/>
                ))}
            </div>
        </div>
    );
}

export default TrendingSection