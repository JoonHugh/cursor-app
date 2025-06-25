import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import User from '../models/userModel.js';

// @desc    Upload profile picture (deletes old one)
// @route   POST /api/images/profile
// @access  Private
export const uploadProfileImage = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Delete old profile picture if exists
        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            
            try {
                await cloudinary.uploader.destroy(`cursor-app/profile/${publicId}`);
                console.log("Deleted old profile image:", publicId);
            } catch (err) {
                console.warn("Failed to delete old profile image:", err.message);
            }
        }

        // Update user with new image
        user.image = req.file.path;
        await user.save();
        console.log("File uploaded to Cloudinary:", req.file);
        res.status(200).json({ imageUrl: req.file.path });
    } catch (err) {
        console.error("Upload failed:", err.message);
        res.status(500).json({ message: 'Server error during image upload' });
    }
});

// @desc    Upload blog image (doesn't delete anything)
// @route   POST /api/images/blog
// @access  Private
export const uploadBlogImage = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        res.status(200).json({ 
            success: true,
            imageUrl: req.file.path 
        });
    } catch (err) {
        console.error("Blog image upload failed:", err);
        res.status(500).json({ 
            success: false,
            message: 'Server error during blog image upload' 
        });
    }
});