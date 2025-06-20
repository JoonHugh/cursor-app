import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
    
    // res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });

    
    // if (!req.file || !req.file.path) {
    //     return res.status(400).json({ message: 'Image not uploaded' });
    // }

    // res.status(200).json({ imageUrl: req.file.path });


    try {
        if (!req.file) {
            console.error("⚠️ No file found in request");
            return res.status(400).json({ message: 'No image uploaded' });
        }

        console.log("✅ File uploaded to Cloudinary:", req.file);

        res.status(200).json({ imageUrl: req.file.path });
    } catch (err) {
        console.error("❌ Upload failed:", err.message);
        res.status(500).json({ message: 'Server error during image upload' });
    }
});