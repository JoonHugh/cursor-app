import asyncHandler from 'express-async-handler';

import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';

// @desc GET blog post by slug
// @GET /blogs/:slug
// @access Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('user', 'name');
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}) // getBlogBySlug

// @desc GET blogs
// @route GET /blogs
// @access Private
export const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user.id })
        .populate('user', 'name email')
        .populate('comments.user', 'name');


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

        // Add this console.log to verify what's being received:
        // console.log("Updating blog with data:", req.body);
    
    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error ('User not found');
    } // if

    // console.log("User", req.user);

    // Make sure the logged in user matches the blog user
    if (blog.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    } // if
    // console.log("user authorized")
    
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
         // Add this to verify the response:
    // console.log("Updated blog:", updatedBlog);

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
    
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    
    if (blog.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error("User not authorizedd");
    } // if
    
    await Blog.deleteOne({ _id: req.params.id })

    res.status(200).json({ id: req.params.id });
});