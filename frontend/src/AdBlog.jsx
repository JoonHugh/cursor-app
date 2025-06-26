import styles from './AdBlog.module.css';
import { Parallax } from 'react-scroll-parallax';
import BlogSection from './BlogSection.jsx';

const DEBUG = import.meta.env.DEBUG;

function AdBlog() {

    return(
        <div className={styles["main-container"]}>
            <div className={styles["ad-container1"]}>
                <a href="https://hugh-dev.com/" target="_blank">
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
                </a>
            </div>
            <BlogSection />
        </div>
    );
}

export default AdBlog