import styles from './AdBlog.module.css';
import ShareGrid from './ShareGrid.jsx';
import { Parallax } from 'react-scroll-parallax';


function AdBlog() {
    return(
        <div className={styles["main-container"]}>
            <div className={styles["ad-container1"]}>
                <div className={styles["ad-container2"]}>
                    <Parallax translateY={[-20, 20]} scale={[1.2, 1.2]}>
                        <img className={styles["ad-image"]} src="/assets/ad1.jpg" alt="advertisement"></img>
                    </Parallax>
                    <span className={styles["company-name"]}>Hugh Development Studios</span>
                    <span className={styles["slogan"]}>Unleash the Power of SEO & Marketing</span>
                    <div className={styles["box"]}>
                        <span className={styles["call-to-action"]}>CONSULT NOW</span>
                    </div>
                </div>
            </div>
            <div className={styles["entry-container"]}>
                <img></img>
                <span className={styles["category"]}></span>
                <span className={styles["title"]}></span>
                <div className={styles["share-grid"]}>
                    <ShareGrid />
                </div>

            </div>
        </div>
    );
}

export default AdBlog