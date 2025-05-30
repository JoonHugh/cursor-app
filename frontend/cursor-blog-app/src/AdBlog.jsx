import styles from './AdBlog.module.css';

function AdBlog() {
    return(
        <div className={styles["main-container"]}>
            <div className={styles["ad-container"]}>
                <img></img>
                <span className={styles["company-name"]}>Hugh Development Studios</span>
                <span className={styles["slogan"]}>Unleash the Power of SEO & Marketing</span>
                <div>
                    <span className={styles["call-to-action"]}>CONSULT NOW</span>
                </div>
            </div>
            <div className={styles["entry-container"]}>
                <img></img>
                <span className={styles["category"]}></span>

            </div>
        </div>
    );
}

export default AdBlog