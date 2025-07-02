import styles from './Footer.module.css';

function Footer() {
    return(
        <div className={styles["container"]}>
            <div className={styles["main-container"]}>
                <div className={styles["box"]}>
                    <a href="/home"><h1>cursor</h1></a>
                    <h5>Joon's personal blog website</h5>
                </div>
                <div className={styles["navigation"]}>
                    <div>
                        <a href="/">Home</a>
                        <a href="/about">About Us</a>
                        <a href="/readme">Read Me</a>
                    </div>
                    <div>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/tos">Terms & Conditions</a>
                        <a href="/users/me">Profile</a>
                    </div>
                </div>
            </div>
            <div className={styles["copyright"]}>
                <p>Copyright &copy; 2025 <a href="https://hugh-dev.com/">Hugh-Dev Studios</a>. All rights reserved.</p>
            </div>
        </div>
    );
} // Footer

export default Footer