import { BsMoonStars } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import {Link} from 'react-router-dom';

import styles from './Header.module.css';

function Header() {
    return(
        <div className={styles["header-grid"]}>
                <button className={styles["menu-button"]}><i className="material-icons">&#xe5d2;</i></button>
                <h1 className={styles["website-name"]}><a>cursor</a></h1>
                <ul className={styles["button-group"]}>
                    <li>
                        <Link to='/login'>
                            <CiLogin /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                    {/* <li className={styles["dark-mode-button"]}><i className="fa">&#xf186;</i></li>
                    <li className={styles["profile-button"]}><i className="material-icons">&#xe7ff;</i></li> */}
                </ul>
        </div>
    );
}

export default Header