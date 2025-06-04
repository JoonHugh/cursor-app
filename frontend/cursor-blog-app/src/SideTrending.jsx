import styles from './SideTrending.module.css';
import SideTrendingCard from './SideTrendingCard.jsx';

function SideTrending({ entries }) {

    return(
        <div className={styles["container"]}>
            <h5>TRENDING POSTS</h5>
            <div className={styles["grid"]}>
                {entries.map((entry, index) => (
                    <SideTrendingCard key={index} index={index} entry={entry}/>
                ))}
            </div>
        </div>
    );
}

export default SideTrending