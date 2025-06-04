import Hero from './Hero.jsx';
import BlogGrid from './BlogGrid.jsx';
import styles from './MainContainer.module.css';
import SideBar from './Sidebar.jsx';
import GridSection from './GridSection.jsx';
import Newsletter from './Newsletter.jsx';

function MainContainer() {

    const images = [
        '/assets/insta1.png',
        '/assets/insta2.png',
        '/assets/insta3.png',
        '/assets/insta4.png',
        '/assets/insta5.png',
        '/assets/insta6.png'
    ];

    return(
        <div>
            <div className={styles['main-container']}>
                <Hero />
                <BlogGrid />
                <SideBar images={images} />
            </div>
                <GridSection images={images} />
            <div className={styles['main-container2']}>
                <Newsletter />
            </div>
        </div>
    );
} // MainContent 

export default MainContainer