import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService.js';

const DEBUG = import.meta.env.DEBUG;

const initialState = {
    homeBlogs: [],
    blogs: [],
    recommendedBlogs: [],
    featured: [],
    comments: [],
    excludedBlogIds: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Fetch blogs for Home page
export const fetchFeatured = createAsyncThunk('blogs/fetchFeatured', async (_, thunkAPI) => {
    try {
        return await blogService.fetchFeatured();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

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

export const likeBlog = createAsyncThunk('blogs/like', async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await blogService.likeBlog(blogData, token);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const fetchRecommended = createAsyncThunk('recommended/fetchRecommended', async ({ userId, excludeId, tags, category }) => {
    try {
        if (DEBUG) console.log("Here");
        const response = await blogService.fetchRecommended(userId, excludeId, tags, category)
        if (DEBUG) console.log("Here2");
        if (DEBUG) console.log("response:", response);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchComments = createAsyncThunk('comments/fetchComments', async (blogData, thunkAPI) => {
    try {
        const response = await blogService.fetchComments(blogData);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const addComment = createAsyncThunk('comments/addComment', async (blogData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await blogService.addComment(blogData, token);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getHomeBlogs = createAsyncThunk('blogs/home', async (blogData, thunkAPI) => {
    try {
        const response = await blogService.getHomeBlogs(blogData);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setExcludedBlogIds: (state, action) => {
            state.excludedBlogIds = action.payload;
        },
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
            .addCase(likeBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likeBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updatedBlog = action.payload;

                if (updatedBlog?._id) {
                    const index = state.blogs.findIndex(
                        (blog) => blog._id === updatedBlog._id
                    );
                    if (index !== -1) {
                        state.blogs[index] = updatedBlog;
                    }
                }
            })
            .addCase(likeBlog.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchRecommended.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRecommended.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.recommendedBlogs = action.payload;
            })
            .addCase(fetchRecommended.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.comments = action.payload.comment;
            })
            .addCase(addComment.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchFeatured.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFeatured.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.featured = action.payload;
            })
            .addCase(fetchFeatured.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getHomeBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHomeBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.homeBlogs = action.payload;
            })
            .addCase(getHomeBlogs.rejected, (state, action)  => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset, setExcludedBlogIds } = blogSlice.actions
export default blogSlice.reducer