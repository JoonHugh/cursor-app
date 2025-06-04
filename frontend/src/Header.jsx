import { faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

function Header() {
    return(
        <div className={styles["header-grid"]}>
                <button className={styles["menu-button"]}><i className="material-icons">&#xe5d2;</i></button>
                <h1 className={styles["website-name"]}><a>cursor</a></h1>
                <div className={styles["button-group"]}>
                    <button className={styles["profile-button"]}><i className="material-icons">&#xe7ff;</i></button>
                    <button className={styles["dark-mode-button"]}><i className="fa">&#xf186;</i></button>
                </div>
        </div>
    );
}

export default Header