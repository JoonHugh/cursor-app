import styles from './Follow.module.css';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";





function Follow() {
    return(
        <div className={styles["container"]}>
            <div className={styles["flex-box"]}>
                <h5>FOLLOW US</h5>
                <div className={styles["grid"]}>
                    <div className={styles["columns"]}>
                        <a className={styles["facebook-icon"]} href="https://www.facebook.com/share/168K5ppLYS/?mibextid=wwXIfr" target="_blank"><FaFacebook />
                            <span>16</span>
                        </a>
                    </div>
                    <div className={styles["columns"]}>
                        <a className={styles["twitter-icon"]} href="#" target="_blank"><FaXTwitter />
                            <span>77</span>
                        </a>
                    </div>
                    <div className={styles["columns"]}>
                        <a className={styles["instagram-icon"]} href="https://www.instagram.com/joonhugh?igsh=c3ptN3ZseHAyazN1&utm_source=qr" target="_blank"><FaInstagram />
                            <span>473</span>
                        </a>
                    </div>
                    <div className={styles["columns"]}>
                        <a className={styles["pinterest-icon"]} href="#" target="_blank"><FaPinterest />
                            <span>911</span>
                        </a>
                    </div>
                    <div className={styles["columns"]}>
                        <a className={styles["youtube-icon"]} href="#" target="_blank"><FaYoutube />
                            <span>21</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Follow