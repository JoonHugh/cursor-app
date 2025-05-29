// import heroImage from '../public/assets/hero-image.jpg';
import styles from './Hero.module.css';

function Hero() {
    return(
        <div className={styles["image-container"]}>
            <img className={styles["image"]} src="/assets/hero-image.jpg" alt="Hero-Image"></img>
        </div>
    );
}

export default Hero