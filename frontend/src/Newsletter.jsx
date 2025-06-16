import styles from './Newsletter.module.css';

function Newsletter() {
    return(
        <div className={styles["main-container"]}>
            <h2>Sign Up for Our Newsletters</h2>
            <h5>Get notified on updates from your favorite bloggers!</h5>
            <form className={styles["form"]}>
                <div className={styles["inputs"]}>
                    <input className={styles["email-input"]} type="email" placeholder="Enter your email"></input>
                    <button className={styles["submit"]} type="submit">SUBSCRIBE</button>
                </div>
                <span className={styles["disclaimer"]}>By clicking subscribe, you confirm that you have read and are agreeing to our <a href="/privacy">privacy policy</a> regarding the storage of the data submitted through this form.</span>
            </form>
        </div>
    );
}

export default Newsletter