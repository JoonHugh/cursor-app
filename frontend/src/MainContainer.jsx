import Hero from './Hero.jsx';
import BlogGrid from './BlogGrid.jsx';
import styles from './MainContainer.module.css';
import SideBar from './SideBar.jsx';
import GridSection from './GridSection.jsx';
import Newsletter from './Newsletter.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFeatured } from './features/blogs/blogSlice.js';

function MainContainer() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeatured());
    }, [dispatch])

    return(
        <div className={styles["app-font"]}>
            <div className={styles['main-container']}>
                <Hero />
                <BlogGrid />
                <SideBar />
            </div>
                <GridSection />
            <div className={styles['main-container2']}>
                <Newsletter />
            </div>
        </div>
    );
} // MainContent 

export default MainContainer