import styles from './Subscribe.module.css';

function Subscribe() {
    return(
        <div className={styles["main-container"]}>
            <div className={styles["container"]}>
                <label className={styles["label"]}>SUBSCRIBE</label>
                <span className={styles["info"]}>Get notified of your favorite blogger's latest updates!</span>
                <form className={styles["form"]}>
                    <div className={styles["input-container"]}>
                        <input className={styles["input-email"]} type="email" placeholder="Enter your email"></input>
                        <input type="submit" value="SUBSCRIBE"></input>
                    </div>
                    <span className={styles["disclaimer"]}>By checking this box, you confirm that you have read and are agreeing to our <a href="/tos">terms of use</a> and <a href="/privacy">privacy policy</a> regarding the storage of the data submitted through this form.</span>
                </form>
            </div>
        </div>
    );
}

export default Subscribe