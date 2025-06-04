import asyncHandler from 'express-async-handler';

// @desc GET blogs
// @route GET /blogs
// @access Private
export const getBlogs = asyncHandler(async (req, res) => {
    res.status(200);
    throw new Error("Please add some text");
});

// @desc POST blog
// @route POST /blogs
// @access Private
export const  postBlog = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ message: 'Please add a text field' })
    }
    console.log(req.body.text);
    res.status(201).json({ message: 'Create blog' });
});

// @desc PUT blog
// @route PUT /blogs/:id
// @access Private
export const updateBlog = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update blog ${req.params.id}` });
});

// @desc DELETE blog
// @route DELETE /blogs/:id
// @access Private
export const deleteBlog = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete blog ${req.params.id}` });
});