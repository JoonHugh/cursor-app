
import styles from './SideBar.module.css';
import Follow from './Follow.jsx';
import Instagram from './Instagram.jsx';

function SideBar() {
    return(
        <div className={styles["main-container"]}>
            <Follow />
            <Instagram />
        </div>
    );
}

export default SideBar 