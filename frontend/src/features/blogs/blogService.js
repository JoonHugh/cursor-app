import axios from 'axios';

const  API_URL = 'http://localhost:5000/blogs/'

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

const updateBlog = (blogData) => {

}

const deleteBlog = () => {

}

const blogService = {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog
}

export default blogService