import styles from './Footer.module.css';
function Footer() {
    return(
        <div className={styles["main-container"]}>
            <div className={styles["box"]}>
                <a href="/home"><h1>cursor</h1></a>
                <h5>Joon's personal blog website</h5>
            </div>
            <ul className={styles["list"]}>
                <a href="category/LIFESTYLE"><li>LIFESTYLE</li></a>
                <a href="category/TRAVEL"><li>TRAVEL</li></a>
                <a href="category/STYLE"><li>STYLE</li></a>
                <a href="category/INTERIOR"><li>INTERIOR</li></a>
            </ul>
        </div>
    );
} // Footer

export default Footer