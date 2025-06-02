import styles from './Instagram.module.css';
import { FaInstagram } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { BiComment } from "react-icons/bi";


function Instagram() {
    const images = [
        '/assets/insta1.png',
        '/assets/insta2.png',
        '/assets/insta3.png',
        '/assets/insta4.png',
        '/assets/insta5.png',
        '/assets/insta6.png'
    ];

    return(
        <div className={styles["container"]}>
            <h5>INSTAGRAM</h5>
            <a className={styles["profile-image"]} href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank"><img className={styles["profile-image"]} src="/assets/hugh-dev.png" alt="insta-profile"></img></a>
            <a className={styles["username-link"]} href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank"><span className={styles["username"]}>joonhugh</span></a>
            <a className={styles["entity-link"]} href="https://hugh-dev.com/" target="_blank"><span className={styles["entity-name"]}>Hugh Dev Studios</span></a>
            <span className={styles["meta-info"]}>512 FOLLOWING 473 FOLLOWERS</span>
            <div className={styles["grid"]}>
                {images.map((src, index) => (
                    <>
                        <div className={styles["post-container"]}>
                            <img className={styles["image"]} src={src} alt="" />
                            <div className={styles["post-meta"]}>
                                <div className={styles["post-overlay"]}></div>
                                <div className={styles["post-meta-content"]}>
                                <span className={styles["post-meta-info"]}><FiHeart /> {Math.floor(Math.random() * 100) + 30} &nbsp; <BiComment /> {Math.floor(Math.random() * 12)}</span>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <button className={styles["follow-button"]}href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank">
                <span className={styles["btn-text"]}>FOLLOW</span>
                <span className={styles["btn-icon"]}><FaInstagram /></span>
            </button>
        </div>
    );
}

export default Instagram