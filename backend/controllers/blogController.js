import asyncHandler from 'express-async-handler';

import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';

// @desc GET blogs
// @route GET /blogs
// @access Private
export const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user.id })


    res.status(200).json(blogs);
});

// @desc POST blog
// @route POST /blogs
// @access Private
export const  postBlog = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.user) {
        res.status(400);
        throw new Error('Please make sure all required fields are provided');
    }

     const blog = await Blog.create({
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        user: req.user.id,
        category: req.body.category,
        tags: req.body.tags,
        image: req.body.image,
        published: req.body.published,
        readTime: req.body.readTime,
        likes: req.body.likes,
        views: req.body.views,
        featured: req.body.featured,
        comments: req.body.comments,
     })
    // console.log(req.body.text);
    res.status(201).json(blog);
});

// @desc PUT blog
// @route PUT /blogs/:id
// @access Private
export const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(400)
        throw new Error('Blog not found');
    } // if

    const user = await User.findById(req.user.id);
    
    // Check for user
    if (!user) {
        res.status(401);
        throw new Error ('User not found');
    } // if

    // Make sure the logged in user matches the blog user
    if (blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    } // if
    
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedBlog);
});

// @desc DELETE blog
// @route DELETE /blogs/:id
// @access Private
export const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(400);
        throw new Error('Blog not found');
    } // if

    
    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    
    if (blog.user.toString() !== user.id) {
        res.status(401) 
        throw new Error("User not authorizedd");
    } // if
    
    await Blog.deleteOne({ _id: req.params.id })

    res.status(200).json({ id: req.params.id });
});