import styles from './Spinner.module.css';

function Spinner() {
    return(
        <div className={styles["loadingSpinnerContainer"]}>
            <div className={styles["loadingSpinner"]}>
                
            </div>
        </div>
    );
} // Spinner

export default Spinner;