import styles from './SideTrending.module.css';
import SideTrendingCard from './SideTrendingCard.jsx';
import axios from 'axios';
import { useState, useEffect } from  'react';

function SideTrending({ entries }) {

    const API_BLOG = import.meta.env.VITE_BLOG_API_URL;


    const [trendingBlogs, setTrendingBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingBlogs = async () => {
            try {
                const res = await axios.get(`${API_BLOG}trending`);
                console.log("API Response:", res.data); // 👈 Debug the response
                setTrendingBlogs(res.data);
            } catch (error) {
                console.error("Failed to get trending blogs", error);
                setTrendingBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingBlogs();
    }, [])

    return(
        <div className={styles["container"]}>
            <h5>TRENDING POSTS</h5>
            <div className={styles["grid"]}>
                {trendingBlogs.map((blog, index) => (
                    <SideTrendingCard key={index} index={index} blog={blog}/>
                ))}
            </div>
        </div>
    );
}

export default SideTrending