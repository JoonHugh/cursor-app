import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService.js';

const initialState = {
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get user blog posts
export const getBlogs = createAsyncThunk('blogs/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.getBlogs(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Post new blog 
export const createBlog = createAsyncThunk('blogs/create', async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.postBlog(blogData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Update new blog
export const updateBlog = createAsyncThunk('blogs/update', async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.updateBlog(blogData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete blog
export const deleteBlog = createAsyncThunk('blogs/delete', async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await blogService.deleteBlog(blogData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Find and replace the blog instead of pushing
                const index = state.blogs.findIndex(
                    blog => blog._id === action.payload._id
                );
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                }
            })
            .addCase(updateBlog.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = state.blogs.filter(
                    (blog) => blog._id !== action.payload.id
                )
            })
            .addCase(deleteBlog.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = blogSlice.actions
export default blogSlice.reducer