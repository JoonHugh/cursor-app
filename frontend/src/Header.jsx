import { BsMoonStars } from "react-icons/bs";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from './features/auth/authSlice.js';

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return(
        <div className={styles["header-grid"]}>
                <button className={styles["menu-button"]}><i className="material-icons">&#xe5d2;</i></button>
                <h1 className={styles["website-name"]}><Link to="/">cursor</Link></h1>
                <ul className={styles["button-group"]}>
                    {user ? (
                    <>
                        <li>
                            <Link to='/dashboard'>
                                <span className={styles["blogs-link"]}><MdOutlineSpaceDashboard /> My Blogs</span>
                            </Link>
                        </li>
                        <li> 
                            <button onClick={onLogout}>
                                <span className={styles["logout-button"]}><CiLogout /> Logout</span>
                            </button>
                        </li>
                    </>
                    ) : (
                    <>
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
                    </>
                    )}
                    
                    {/* <li className={styles["dark-mode-button"]}><i className="fa">&#xf186;</i></li>
                    <li className={styles["profile-button"]}><i className="material-icons">&#xe7ff;</i></li> */}
                </ul>
        </div>
    );
}

export default Header