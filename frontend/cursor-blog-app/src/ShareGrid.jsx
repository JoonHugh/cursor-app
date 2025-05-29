import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faPinterest, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import styles from './ShareGrid.module.css';

function ShareGrid() {
    return(
        <div className={styles["share-grid"]}>
                    <div className={styles["share"]}>
                        <span>SHARE</span>
                        <i className={styles["right-arrow"]}><FontAwesomeIcon icon={faLongArrowAltRight} /></i>
                    </div>
                    <div className={styles["icons"]}>
                        <a className={styles["facebook-icon"]} href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a className={styles["twitter-icon"]} href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitterSquare} /></a>
                        <a className={styles["pinterest-icon"]} href="https://www.pintrest.com"><FontAwesomeIcon icon={faPinterest} /></a>
                    </div>
                </div>
    );
}

export default ShareGrid