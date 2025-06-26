import axios from 'axios';

const DEBUG = import.meta.env.DEBUG;
const API_URL = import.meta.env.VITE_AUTH_API_URL;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data?.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } // if
    
    if (DEBUG) console.log("Registration response:", response.data);

    return response.data;
} // register

// Login user
const login = async (userData) => {
    if (DEBUG) console.log(`TESTING: ${API_URL}login`)

    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } // if

    return response.data;
} // login

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}

// Update user
const update = async (userData) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    if (DEBUG) {
        console.log("💡 Sending update to:", API_URL + 'me');
        console.log("🧾 Data:", userData);
        console.log("🔐 Auth:", user?.token);
    } // if
    const response = await axios.put(API_URL + 'me', userData, config);

    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data));
    // }

    if (response.data) {
        // Merge existing user data with updates
        const updatedUser = {
            ...user,
            ...response.data,
            token: user.token, // Preserve the token
            
        };
        
        // Only update fields that were actually in the form submission
        if (userData.about !== undefined) updatedUser.about = userData.about;
        if (userData.gender !== undefined) updatedUser.gender = userData.gender;
        if (userData.country !== undefined) updatedUser.country = userData.country;
        if (userData.image !== undefined) updatedUser.image = userData.image;
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return updatedUser;        
    } // if

    return response.data;
} // update

const authService = {
    register,
    logout,
    login,
    update,
} // authService

export default authService;