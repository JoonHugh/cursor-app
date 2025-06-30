import styles from './Comments.module.css';

function Comments({ blog, user }) {
    return(
        <div className={styles["container"]}>
            <p className={styles["section-name"]}>Leave a comment</p>
            {user ? (
                <div className={styles["form-container"]}>
                    <form className={styles["form"]}>
                        <textarea className={styles["comment-area"]} placeholder='Add comment...' required></textarea>
                        <button type="submit" className={styles["submit"]}>Post comment</button>
                    </form>
                </div>
                ) : (
                <p>
                    Must be logged in to comment!
                </p>
            )}
        </div>
    );
}

export default Comments