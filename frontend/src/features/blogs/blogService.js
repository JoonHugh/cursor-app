import axios from 'axios';

const DEBUG = import.meta.env.DEBUG;
const API_URL = import.meta.env.VITE_BLOG_API_URL;

// Get user blogs
const getBlogs = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Create new blog
const postBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, blogData, config);

    return response.data;
}

// Update blog
const updateBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // console.log("Actual url", API_URL + blogData._id)
    const response = await axios.put(API_URL + blogData._id, blogData, config);

    return response.data;
}

// Delete blog
const deleteBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + blogData._id, config);

    return response.data;
}

// Like blog
const likeBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log("going to this backend:", API_URL + blogData._id+'/like');
    const response = await axios.post(`${API_URL}${blogData._id}/like`, {}, config);

    return response.data;
}

const fetchRecommended = async (userId, excludeId, tags, category) => {
    const queryParams = new URLSearchParams({
        exclude: excludeId,
        tags,
        category
      }).toString();

    if (DEBUG) console.log("fetching recommended!");
    if (DEBUG) console.log(`with userId: ${userId} with params ${queryParams}`)

    const response = await axios.get(`${API_URL}user/${userId}?${queryParams}`);

    return response.data;
}

const fetchComments = async (blogData) => {
    const response = await axios.get(`${API_URL}${blogData._id}/comment`);
    
    return response.data;
}

const addComment = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}${blogData._id}/comment`, {
        text: blogData.text,
        parentId: blogData.parentId || null
    }, config);
    
    return response.data
}

const blogService = {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    fetchRecommended,
    fetchComments,
    addComment,
}

export default blogService