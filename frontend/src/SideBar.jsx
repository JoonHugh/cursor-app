
import styles from './SideBar.module.css';
import Follow from './Follow.jsx';
import Instagram from './Instagram.jsx';
import SideTrending from './SideTrending.jsx';

function SideBar({ images, className }) {

    const DEBUG = import.meta.env.DEBUG;

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