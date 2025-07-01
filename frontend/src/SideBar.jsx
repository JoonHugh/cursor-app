
import styles from './SideBar.module.css';
import Follow from './Follow.jsx';
import Instagram from './Instagram.jsx';
import SideTrending from './SideTrending.jsx';

function SideBar({ className }) {

    const images = [
        '/assets/insta1.png',
        '/assets/insta2.png',
        '/assets/insta3.png',
        '/assets/insta4.png',
        '/assets/insta5.png',
        '/assets/insta6.png'
    ];

    return(
        <div className={className}>
            <div className={styles["main-container"]}>
                <Follow />
                <Instagram images={images}/>
                <SideTrending />
            </div>
        </div>
    );
}

export default SideBar 