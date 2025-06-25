import styles from './AboutSection.module.css'

function AboutSection({ user }) {

    const printout = () => {
        console.log("USER FOR BLOG:", user);
    }

    return(
        <div className={styles["container"]}>
            <div className={styles["image-container"]} onClick={printout}>
                <img src={user?.image} alt="profile-image"/>
            </div>
            <p className={styles["about-name"]}>{user?.name}</p>
            <p className={styles["about-text"]}>{user?.about}</p>
        </div>
    );
}

export default AboutSection