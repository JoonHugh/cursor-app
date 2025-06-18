import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset } from '../src/features/auth/authSlice.js'
import styles from './Profile.module.css';


function Profile() {

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    })

    useEffect(() => {
        if (isSuccess) alert("Profile updated!");
        if (isError) alert(`Update failed: ${message}`);
        // dispatch(reset());
    }, [isSuccess, isError, message, dispatch]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const onSubmit  = (e) => {
        e.preventDefault();
        dispatch(update(formData));
    };

    return(
        <div>
            <h5>Profile</h5>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <form onSubmit={onSubmit}>
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

        </div>
    );
}

export default Profile