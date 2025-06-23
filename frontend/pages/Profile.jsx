import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset } from '../src/features/auth/authSlice.js'
import styles from './Profile.module.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";






function Profile() {

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        about: user?.about || '',
        gender: user?.gender || '',
        country: user?.country || '',
    })

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

    const onSubmit  = (e) => {
        e.preventDefault();
        dispatch(update(formData));
        // In your Profile component
        console.log('Redux user state:', user);
        console.log('Form data state:', formData);
    };

    const genders = [{label: "Male", value: "MALE"}, {label: "Female", value: "FEMALE"}, {label: "Other", value: "OTHER"}];
    const options = useMemo(() => countryList().getData(), []);

    return(
        <div className={styles["form-container"]}> 
            <h3>Profile</h3>
            <div className={styles["image-container"]}>
                <img src={user?.image || '../assets/defaultprofilepic.jpg'} alt="profile image"></img>
            </div>

            <form onSubmit={onSubmit} className={styles["form"]}>
                <label className={styles["profile-info"]}>
                    Username:
                    <input name="name" value={formData.name} onChange={onChange}/>
                </label>
                <label className={styles["profile-info"]}>
                    Email:
                    <input name="email" value={formData.email} onChange={onChange}/>
                </label>
                <label className={styles["profile-info"]}>
                    New Password:
                    <input type="password" name="password" value={formData.password} onChange={onChange}/>
                </label>
                <label className={styles["profile-info"]}>
                    Gender:
                    <Select 
                        className={styles["select-tags"]}
                        type="text" 
                        name="gender" 
                        value={genders.find(option => option.value === formData.gender)}
                        onChange={(selectedOption) => onChange({...selectedOption, name: "gender"})}
                        options={genders}
                        placeholder='Gender'
                        styles={{
                            group: (base) => ({
                            ...base,
                            padding: 0
                            }),
                            groupHeading: (base) => ({
                            ...base,
                            fontSize: '14px',
                            marginBottom: '4px',
                            backgroundColor: '#f8f9fa'
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected ? 'aliceblue' : isFocused ? 'aliceblue' : base.backgroundColor,
                                color: '#000', 
                                '&:active': {
                                    backgroundColor: 'hsl(208, 100.00%, 91.60%);'
                                },
                            })
                        }}
                    />
                </label>
                <label className={styles["profile-info"]}>
                    Country:
                    <Select 
                        className={styles["select-tags"]}
                        type="text" 
                        name="country"  
                        value={options.find(option => option.value === formData.country)}
                        onChange={(selectedOption) => onChange({...selectedOption, name: "country"})}
                        options={options}
                        placeholder='Country'
                        styles={{
                            group: (base) => ({
                            ...base,
                            padding: 0
                            }),
                            groupHeading: (base) => ({
                                ...base,
                                fontSize: '14px',
                                marginBottom: '4px',
                                backgroundColor: '#f8f9fa'
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected ? 'aliceblue' : isFocused ? 'aliceblue' : base.backgroundColor,
                                color: '#000', 
                                '&:active': {
                                    backgroundColor: 'hsl(208, 100.00%, 91.60%);'
                                },
                            })
                        }}
                    />
                </label>
                <label className={styles["profile-info"]}>
                    About:
                    <MDEditor 
                        height={300}
                        className={styles["content-editor"]} 
                        value={formData.about}
                        onChange={(value) => setFormData({...formData, about: value})} 
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                    />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
            <p>Date joined: {new Date(user.createdAt).toLocaleString('en-US', {
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'})}
            </p>
            <p>Last updated: {new Date(user.updatedAt).toLocaleString('en-US', {
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'})}
            </p>

            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default Profile