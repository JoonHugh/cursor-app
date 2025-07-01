import styles from './GridSection.module.css';
import { FiHeart } from "react-icons/fi";
import { BiComment } from "react-icons/bi";

function GridSection() {

    const images = [
        '/assets/insta1.png',
        '/assets/insta2.png',
        '/assets/insta3.png',
        '/assets/insta4.png',
        '/assets/insta5.png',
        '/assets/insta6.png'
    ];

    return(
        <div className={styles["grid"]}>
            {images.map((src, index) => (
                <div className={styles[`post-container-${index}`]} key={index}>
                    <img className={styles[`image`]} src={src}></img>
                    <div className={styles["post-meta"]}>
                        <div className={styles["post-overlay"]}></div>
                        <div className={styles["post-meta-content"]}>
                            <span className={styles["post-meta-info"]}><FiHeart /> {Math.floor(Math.random() * 100) + 30} &nbsp; <BiComment /> {Math.floor(Math.random() * 12)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GridSection