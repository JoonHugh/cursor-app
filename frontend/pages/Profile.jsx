import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, reset } from "../src/features/auth/authSlice.js";
import styles from "./Profile.module.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { FiEdit } from "react-icons/fi";
import ImageUpload from "../src/ImageUpload.jsx";

function Profile() {

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.image || "../assets/defaultprofilepic.jpg")

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        about: user?.about || "",
        gender: user?.gender || "",
        country: user?.country || "",
    });


    useEffect(() => {
        if (isSuccess) alert("Profile updated!");
        if (isError) alert(`Update failed: ${message}`);
        // dispatch(reset());
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
        dispatch(update(formData));
        // In your Profile component
        console.log("Redux user state:", user);
        console.log("Form data state:", formData);
    };

    const  handleImageClick = () => {
        fileInputRef.current.click();
        console.log("image-container-clicked")
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const res = await fetch(`${import.meta.env.VITE_IMAGE_API_URL}profile`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: formData
            });

            console.log("res object:", res);
            const text = await res.text();
            console.log("text object:", text);
            const data = await JSON.parse(text);
            console.log("data object:", data);

            setPreviewImage(data.imageUrl);
            setFormData({ ...formData, image: data.imageUrl });
            console.log("image url:", data.imageUrl);
        } catch (err) {
            console.error("❌ Image upload failed", err);
        }
    };
    
    // const changeImage = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             setFormData(...formData, {"image": event.target.})
    //         }
    //     }
    // }

    const genders = [
        { label: "Male", value: "MALE" },
        { label: "Female", value: "FEMALE" },
        { label: "Other", value: "OTHER" },
    ];
    const options = useMemo(() => countryList().getData(), []);


    return (
        <div className={styles["form-container"]}>
            <h3>Profile</h3>
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
                <label className={styles["profile-info"]}>
                    <p>Username:</p>
                    <input name="name" value={formData.name} onChange={onChange} />
                </label>
                <label className={styles["profile-info"]}>
                    <p>Email:</p>
                    <input name="email" value={formData.email} onChange={onChange} />
                </label>
                <label className={styles["profile-info"]}>
                    <p>New Password:</p>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                </label>
                <label className={styles["profile-info"]}>
                    <p>Gender:</p>
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
                <label className={styles["profile-info"]}>
                    <p>Country:</p>
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
                <label className={styles["profile-info"]}>
                    <p>About:</p>
                    <MDEditor
                        height={300}
                        className={styles["content-editor"]}
                        value={formData.about}
                        onChange={(value) => setFormData({ ...formData, about: value })}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                    />
                </label>
                <div className={styles["button-container"]}>
                    <a href="/" className={styles["home-button"]} type="">
                        Back To Home
                    </a>
                    <button
                        className={styles["save-button"]}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
            <p>
                Date joined:{" "}
                {new Date(user.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>
            <p>
                Last updated:{" "}
                {new Date(user.updatedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>

            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default Profile;
