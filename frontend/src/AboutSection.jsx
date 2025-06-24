import styles from './AboutSection.module.css'

function AboutSection({ user }) {

    const printout = () => {
        console.log("USER FOR BLOG:", user);
    }

    return(
        <div className={styles["container"]}>
            <div className={styles["image-container"]} onClick={printout}>
                <img src={user} alt="profile-image"/>
                Hello World
                {user.image}

            </div>
        </div>
    );
}

export default AboutSection