import styles from './Instagram.module.css';
import { FaInstagram } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { BiComment } from "react-icons/bi";


function Instagram({ images }) {
 

    return(
        <div className={styles["container"]}>
            <h5>INSTAGRAM</h5>
            <div className={styles["image-container"]}>
                <a className={styles["profile-image"]} href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank"><img className={styles["profile-image"]} src="/assets/hugh-dev.png" alt="insta-profile"></img></a>
            </div>
            <a className={styles["username-link"]} href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank"><span className={styles["username"]}>joonhugh</span></a>
            <a className={styles["entity-link"]} href="https://hugh-dev.com/" target="_blank"><span className={styles["entity-name"]}>Hugh Dev Studios</span></a>
            <span className={styles["meta-info"]}>475 FOLLOWERS 517 FOLLOWING</span>
            <div className={styles["grid"]}>
                {images.map((src, index) => (
                    <div key={`instagram-post-${index}`} className={styles["post-container"]}>
                        <img className={styles["image"]} src={src} alt="" />
                        <div className={styles["post-meta"]}>
                            <div className={styles["post-overlay"]}></div>
                            <div className={styles["post-meta-content"]}>
                                <span className={styles["post-meta-info"]}><FiHeart /> {Math.floor(Math.random() * 100) + 30} &nbsp; <BiComment /> {Math.floor(Math.random() * 12)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a className={styles["follow-link"]}href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank">
                <button className={styles["follow-button"]}>
                    <span className={styles["btn-text"]}>FOLLOW</span>
                    <span className={styles["btn-icon"]}><FaInstagram /></span>
                </button>
            </a>
        </div>
    );
}

export default Instagram