import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import blogReducer from '../features/blogs/blogSlice.js';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
    },
})