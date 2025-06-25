import styles from './Tags.module.css';

function Tags({ blog }) {
    return(
        <div className={styles["container"]}>
            TAGS
            <ul className={styles["tag-list"]}>
                {blog.tags.length > 0 ? (blog.tags.map((tag, index) => (
                    <li key={`tags-${index}`} className={styles["tags"]}>#{tag.toUpperCase()}</li>
                ))) : (
                    <li className={styles["no-tags"]}>No tags</li>
                )}
            </ul>
        </div>
    );
}

export default Tags