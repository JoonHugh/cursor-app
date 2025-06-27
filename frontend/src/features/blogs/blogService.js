import axios from 'axios';

const  API_URL = import.meta.env.VITE_BLOG_API_URL;

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
    console.log("going to this backend:", API_URL+blogData._id+'/like');
    const response = await axios.post(`${API_URL}${blogData._id}/like`, {}, config);

    return response.data;
}

const blogService = {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
}

export default blogService