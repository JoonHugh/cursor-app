import styles from './EntryHeader.module.css';

export function EntryHeader({ entry }) {
    const blogLink = "/blog/" + entry.slug;

    return(
        <div className={styles["entry-preview-col"]}>
            <a href={blogLink} className={styles["meta-category"]}>{entry.category}</a>
            <a href={blogLink} className={styles["entry-title"]}><h2 className={styles["entry-title"]}>{entry.title}</h2></a>
            <span className={styles["meta-post"]}><a href={blogLink}>{entry.user.username}</a> • <a href="#">{new Date(entry.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</a> • <a href={blogLink}>{Object.keys(entry.comments).length > 0 ? `${Object.keys(entry.comments).length}` : `NO`} COMMENTS</a></span>
        </div>
    );
}

export default EntryHeader