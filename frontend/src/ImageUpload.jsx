import React, { useState  } from 'react';
import styles from './ImageUpload.module.css';
import { AiOutlineCloudUpload } from "react-icons/ai";

const  MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function ImageUpload({ onImageSelect }) {

    // const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleFile = (file) => {
        if (!file.type.startsWith ("image/")) {
            setError("Only image files allowed!");
            return;
        } // if

        if (file.size > MAX_FILE_SIZE) {
            setError("Max file size exceeded! (5MB)");
            return;
        } // if

        setError("");
        setPreview(URL.createObjectURL(file));
        onImageSelect(file);
    } // handleFile

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    } // handleDrop

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) handleFile(file);
    }

    return(
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={styles["border"]}
            >
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className={styles["imageUploadInput"]}
            />


            <label
                htmlFor="imageUploadInput"
                className={styles["block"]}
            >
                {preview ? (
                    <img src={preview} alt="preview" className={styles["image"]} />
                ) : (
                    <div className={styles["prompt"]}>
                        <i><AiOutlineCloudUpload className={styles["icon"]}/></i>
                        <p>Drag and drop an image, or click to select</p>
                    </div>
                )}
            </label>

            {error && <p className={styles["error-message"]}>{error}</p>}
        </div>
    );
}

export default ImageUpload