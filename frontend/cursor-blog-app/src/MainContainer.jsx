import Hero from './Hero.jsx';
import BlogGrid from './BlogGrid.jsx';
import styles from './MainContainer.module.css';

function MainContainer() {
    return(
        <div className={styles['main-container']}>
            <Hero />
            <BlogGrid />
        </div>
    );
} // MainContent 

export default MainContainer