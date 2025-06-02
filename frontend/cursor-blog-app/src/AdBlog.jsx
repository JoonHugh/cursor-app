import styles from './AdBlog.module.css';
import { Parallax } from 'react-scroll-parallax';
import { randomImage } from './Blog.jsx';
import { randomizer } from './EntryHeader.jsx';
import BlogSection from './BlogSection.jsx';


function AdBlog() {
    const entry = randomizer();
    console.log(entry)

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
            <div className={styles["entry-container1"]}>
                <BlogSection />
            </div>
        </div>
    );
}

export default AdBlog