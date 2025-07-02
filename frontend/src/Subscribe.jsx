import styles from './Subscribe.module.css';
import { toast } from 'react-toastify';

function Subscribe({ blog }) {

    const onSubmit = (e) => {
        e.preventDefault();
        toast.success("Subscribed!")
    }
    return(
        <div className={styles["main-container"]}>
            <div className={styles["container"]}>
                <label className={styles["label"]}>SUBSCRIBE</label>
                <span className={styles["info"]}>Get notified of {blog?.user ? (blog.user.username) : ("your favorite blogger")}'s latest updates and posts!</span>
                <form onSubmit={onSubmit} className={styles["form"]}>
                    <div className={styles["input-container"]}>
                        <input className={styles["input-email"]} type="email" placeholder="Enter your email"></input>
                        <input className={styles["submit"]} type="submit" value="SUBSCRIBE"></input>
                    </div>
                    <span className={styles["disclaimer"]}>By clicking subscribe, you confirm that you have read and are agreeing to our <a href="/tos">terms of use</a> and <a href="/privacy">privacy policy</a> regarding the storage of the data submitted through this form.</span>
                </form>
            </div>
        </div>
    );
}

export default Subscribe