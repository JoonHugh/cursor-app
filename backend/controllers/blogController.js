import asyncHandler from 'express-async-handler';

import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';

import mongoose from 'mongoose'

const DEBUG = false;

// @desc Update view count by 1
// @PUT /blogs/:id/views
// @access Public
export const updateBlogViews = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } }, // Use $inc to atomically increment
            { new: true }
        );
        
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @desc GET blog post by slug
// @GET /blogs/:slug
// @access Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('user', 'name username country gender about image trendingScore');
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
        .populate('user', 'name username country gender about image trendingScore')
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

// @desc GET Trending blogs
// @route GET /blogs/api/trending/
// @access Public
export const getTrending = asyncHandler(async (req, res) => {
    try {
        if (DEBUG) console.log("Route hit!"); // Basic verification

        const blogs = await Blog.find({ trendingScore: { $exists: true } })
        .sort({ trendingScore: -1 }) // sort by trendingScore in descending order
        .limit(5)
        .populate('user', 'username')
        if (DEBUG) console.log("MongoDB Query Result:", blogs);

        res.status(200).json(blogs);
    } catch (error) {
        console.error("Trending fetch failed:", error); // log full error
        res.status(500).json({ message: error.message || "Server error" });
    }
})

// @desc LIKE blogs
// @route POST /blogs/:id/like
// @access Private
export const likeBlog = asyncHandler(async (req, res) => {
    try {
        if (DEBUG) console.log("Here 0")
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            res.status(404);
            throw new Error('Blog not found');
        }
        if (DEBUG) console.log("Here 1")
        if (!Array.isArray(blog.likes)) {
            blog.likes = [];
          }
        if (DEBUG) {
            console.log("All likes before checking:", blog.likes)
            console.log("Here 1.5")
        }
        const alreadyLiked = blog.likes.some(
            like => {
                if (DEBUG) console.log("Inspecting like.user:", like.user);
                return like.user && like.user.toString() === req.user.id.toString();
            }
        );
        if (DEBUG)  console.log("Here 2")
        if (alreadyLiked) {
            if (DEBUG) console.log("Here 3")
            blog.likes = blog.likes.filter(
                like => like.user.toString() !== req.user._id.toString()
            );
            if (DEBUG) console.log("Here 4")
        } else {
            if (DEBUG) console.log("Here 5")
            blog.likes.push({
                user: req.user._id,
                createdAt: new Date(),
            });
            if (DEBUG) console.log("Here 6")
        }
        if (DEBUG) console.log("Here 7")
        await blog.save();
        if (DEBUG) console.log("Here 8")
        res.status(200).json(blog);
    } catch(error) {
        res.status(500)
        throw new Error ("Likes not updated");
    }
}) // likeBlog

// @desc GET Recommended blogs
// @route GET /blogs/user/:userId?exclude=<currentBlogId>
// @access Private
export const getRecommended = asyncHandler( async(req, res) => {
    const { userId } = req.params;
    const { exclude, tags, category } = req.query;

    const tagsArray = tags ? tags.split(',').map(tag => tag.trim().toUpperCase()) : [];
    const normalizedCategory = category?.trim().toUpperCase();

    const excludeId = exclude && mongoose.Types.ObjectId.isValid(exclude)
        ? new mongoose.Types.ObjectId(exclude)
        : null;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    const commonConditions = {
        published: true,
        // user: { $ne: new mongoose.Types.ObjectId(userId) },
    };
    if (excludeId) commonConditions._id = { $ne: excludeId };

    let allBlogs = [];

    const fetchStep = async (additionalConditions, sort = null) => {
        const alreadyFetchedIds = allBlogs.map(blog => blog._id);
        const finalMatch = {
            ...commonConditions,
            ...additionalConditions,
            _id: { ...commonConditions._id, $nin: alreadyFetchedIds },
        };
        console.log("Running query with (finalMatch) :", finalMatch);

        let query = Blog.find(finalMatch).populate('user', 'username');
        if (sort) query = query.sort(sort);
        const result = await query.limit(8 - allBlogs.length);
        allBlogs = allBlogs.concat(result);
    };

    // Step 1: tags + category
    if (tagsArray.length > 0 && normalizedCategory) {
        await fetchStep({ tags: { $in: tagsArray }, category: normalizedCategory });
    }
    console.log("tags array:", tagsArray);

    // Step 2: category only
    if (allBlogs.length < 8 && normalizedCategory) {
        await fetchStep({ normalizedCategory });
    }
    console.log("category:", normalizedCategory);

    // Step 3: trending
    if (allBlogs.length < 8) {
        await fetchStep({ trendingScore: { $exists: true } }, { trendingScore: -1 });
    }

    // Step 4: newest
    if (allBlogs.length < 8) {
        await fetchStep({}, { createdAt: -1 });
    }

    res.status(200).json(allBlogs);
}) // getRecommended


export const addComment = asyncHandler( async(req, res) => {
    const { text, parentId } = req.body;

    if (!text) return res.status(400).json({ message: 'Comment text is required' });

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(400).json({ message: 'No blog found' });

        const comment = {
            user: req.user._id,
            text,
            createdAt: new Date(),
            replies: []
        }

        if (parentId) {
            // nested reply
            const parentComment = blog.comments.id(parentId);
            if (!parentComment) return res.status(404).json({ message: "Parent comment not found"});

            parentComment.replies.push({
                user: req.user._id,
                text,
                createdAt: new Date()
            });
        } else {
            blog.comments.push(comment);
        }

        await blog.save();

        const updatedBlog = await blog.populate('comments.user comments.replies.user', 'name username image gender country')

        res.status(201).json({ message: 'Comment added', comment: updatedBlog.comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); // addComment

export const getComments = asyncHandler( async(req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id)
            .populate('comments.user comments.replies.user', 'name username image gender country');

        if (!blog) return res.status(400).json({ message: 'Blog not found' });

        res.json(blog.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); // getComments

export const deleteComment = asyncHandler( async(req, res) => {

}); // getComments