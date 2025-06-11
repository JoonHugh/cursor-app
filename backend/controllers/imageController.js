import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
    
    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });

});