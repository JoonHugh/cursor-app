import styles from './AboutSection.module.css'

function AboutSection({ blog }) {

    const printout = () => {
        console.log("USER FOR BLOG:", blog?.user);
    }

    return(
        <div className={styles["container"]}>
            <div className={styles["image-container"]} onClick={printout}>
                <img src={blog.user?.image} alt="profile-image"/>
            </div>
            <p className={styles["about-name"]}>{user?.name}</p>
            <p className={styles["about-text"]}>{blog.user?.about}</p>
        </div>
    );
}

export default AboutSection