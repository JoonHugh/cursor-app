import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
    
    // res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'Image not uploaded' });
    }

    res.status(200).json({ imageUrl: req.file.path });

});