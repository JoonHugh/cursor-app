import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, reset } from "../src/features/auth/authSlice.js";
import styles from "./Profile.module.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { FiEdit } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useMediaQuery } from "@mui/material";



const DEBUG = import.meta.env.DEBUG;

function Profile() {
    
    const isMobile = useMediaQuery('(max-width:768px)');

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.image || "../assets/defaultprofilepic.jpg")

    const [formData, setFormData] = useState({
        name: user?.name || "",
        username: user?.username || user?.name,
        email: user?.email || "",
        password: "",
        about: user?.about || "",
        gender: user?.gender || "",
        country: user?.country || "",
        image: user?.image,
    });


    useEffect(() => {
        if (isSuccess) toast.success("Successfully updated profile!")
        if (isError) toast.error("Error updating profile.")
        dispatch(reset());
    }, [isSuccess, isError, message, dispatch]);

    const onChange = (e) => {
        if (e && e.target) {
            // Regular input change
            setFormData({ ...formData, [e.target.name]: e.target.value });
        } else {
            // Select component change (e is the selected option)
            setFormData({ ...formData, [e.name]: e.value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.username !== "") {
            dispatch(update(formData));
        } else {
            toast.error("Must have username");
        }
        // In your Profile component
        if (DEBUG) {
            console.log("Redux user state:", user);
            console.log("Form data state:", formData);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
        if (DEBUG) console.log("image-container-clicked")
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formDataToSend = new FormData();
        formDataToSend.append("image", file);
    
        try {
            setIsUploading(true);
            const res = await fetch(`${import.meta.env.VITE_IMAGE_API_URL}profile`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: formDataToSend
            });

            const data = await res.json();
            if (DEBUG) console.log("data object:", data);

            setPreviewImage(data.imageUrl);
            setFormData(prev => ({ ...prev, image: data.imageUrl }));
            dispatch(update({ image: data.imageUrl }))
            if (DEBUG) console.log("image url:", data.imageUrl);
        } catch (err) {
            console.error("Image upload failed", err);
        } finally {
            setIsUploading(false);
        }
    };

    const genders = [
        { label: "He/Him", value: "He/Him" },
        { label: "She/Her", value: "She/Her" },
        { label: "They/Them", value: "They/Them" },
    ];
    const options = useMemo(() => countryList().getData(), []);


    return (
        <div className={styles["form-container"]}>
            <h3>Profile</h3>
            {user ? (
                <>
                
                    <div className={styles["image-container"]} onClick={handleImageClick}>
                        <img
                            src={previewImage ? previewImage : "../assets/defaultprofilepic.jpg"}
                            alt="profile image"
                        />
                        <i>
                            <FiEdit />
                        </i>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className={styles["image-input"]}
                            accept="image/*"
                        />
                    </div>
        
                    <form onSubmit={onSubmit} className={styles["form"]}>
                        
                        <p>Name:</p>
                        <label className={styles["profile-info"]}>
                            <input name="name" value={formData.name} onChange={onChange} />
                        </label>
                        
                        <p>Username:</p>
                        <label className={styles["profile-info"]}>
                            <input name="username" value={formData.username} onChange={onChange} />
                        </label>
                        
                        <p>Email:</p>
                        <label className={styles["profile-info"]}>
                            <input name="email" value={formData.email} onChange={onChange} />
                        </label>
                        
                        <p>New Password:</p>
                        <label className={styles["profile-info"]}>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                            />
                        </label>
                        
                        <p>Gender:</p>
                        <label className={styles["profile-info"]}>
                            <Select
                                className={styles["select-tags"]}
                                type="text"
                                name="gender"
                                value={genders.find((option) => option.value === formData.gender)}
                                onChange={(selectedOption) =>
                                    onChange({ ...selectedOption, name: "gender" })
                                }
                                options={genders}
                                placeholder="Gender"
                                styles={{
                                    group: (base) => ({
                                        ...base,
                                        padding: 0,
                                    }),
                                    groupHeading: (base) => ({
                                        ...base,
                                        fontSize: "14px",
                                        marginBottom: "4px",
                                        backgroundColor: "#f8f9fa",
                                    }),
                                    option: (base, { isFocused, isSelected }) => ({
                                        ...base,
                                        backgroundColor: isSelected
                                            ? "aliceblue"
                                            : isFocused
                                                ? "aliceblue"
                                                : base.backgroundColor,
                                        color: "#000",
                                        "&:active": {
                                            backgroundColor: "hsl(208, 100.00%, 91.60%);",
                                        },
                                    }),
                                }}
                            />
                        </label>
                        
                        <p>Country:</p>
                        <label className={styles["profile-info"]}>
                            <Select
                                className={styles["select-tags"]}
                                type="text"
                                name="country"
                                value={options.find((option) => option.value === formData.country)}
                                onChange={(selectedOption) =>
                                    onChange({ ...selectedOption, name: "country" })
                                }
                                options={options}
                                placeholder="Country"
                                styles={{
                                    group: (base) => ({
                                        ...base,
                                        padding: 0,
                                    }),
                                    groupHeading: (base) => ({
                                        ...base,
                                        fontSize: "14px",
                                        marginBottom: "4px",
                                        backgroundColor: "#f8f9fa",
                                    }),
                                    option: (base, { isFocused, isSelected }) => ({
                                        ...base,
                                        backgroundColor: isSelected
                                            ? "aliceblue"
                                            : isFocused
                                                ? "aliceblue"
                                                : base.backgroundColor,
                                        color: "#000",
                                        "&:active": {
                                            backgroundColor: "hsl(208, 100.00%, 91.60%);",
                                        },
                                    }),
                                }}
                            />
                        </label>
                        
                        <p className={styles["label"]}>About:</p>
                        <label className={styles["profile-info"]}>
                            <MDEditor
                                height={300}
                                className={styles["about-editor"]}
                                value={formData.about}
                                onChange={(value) => setFormData({ ...formData, about: value })}
                                previewOptions={{
                                    rehypePlugins: [[rehypeSanitize]],
                                }}
                                textareaProps={{
                                    maxLength: 300
                                }}
                                preview={isMobile ? 'edit' : 'live'}
                            />
                        </label>
                        <div className={styles["button-container"]}>
                            <a href="/" className={styles["home-button"]} type="">
                                Back To Home
                            </a>
                            <button
                                className={styles["save-button"]}
                                type="submit"
                                disabled={isLoading || isUploading} // if either photo is uploading or pressed update button, then disable
                            >
                                {isLoading ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </form>
                    <p className={styles["created-date"]}>
                        Date joined:{" "}
                        {new Date(user.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                    <p className={styles["updated-date"]}>
                        Last updated:{" "}
                        {new Date(user.updatedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
        
                    <pre className={styles["dev-profile"]}>{JSON.stringify(user, null, 2)}</pre>
                </>
            ) : (
                <div className={styles["login-container"]}>
                    <p>Log in to view your profile</p>
                    <div className={styles["redirect"]}>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>
                </div>    
            )}
            </div>
    );
}

export default Profile;
