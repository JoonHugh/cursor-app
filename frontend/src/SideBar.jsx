
import styles from './SideBar.module.css';
import Follow from './Follow.jsx';
import Instagram from './Instagram.jsx';
import SideTrending from './SideTrending.jsx';
import { createEntry } from './BlogGrid.jsx';

function SideBar({ images, className }) {

    const entries = [];

    for (let i = 0; i < 5; i++) {
        entries.push(createEntry());
        console.log("image:", entries[i].image);
    }

    return(
        <div className={className}>
            <div className={styles["main-container"]}>
                <Follow />
                <Instagram images={images}/>
                <SideTrending entries={entries}/>
            </div>
        </div>
    );
}

export default SideBar 