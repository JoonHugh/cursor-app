import Hero from './Hero.jsx';
import BlogGrid from './BlogGrid.jsx';
import styles from './MainContainer.module.css';
import SideBar from './Sidebar.jsx';

function MainContainer() {
    return(
        <div className={styles['main-container']}>
            <Hero />
            <BlogGrid />
            <SideBar />
        </div>
    );
} // MainContent 

export default MainContainer