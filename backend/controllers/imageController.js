import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {

    try {
        const user = req.user;
        if (!req.file) {
            console.error("No file found in request");
            return res.status(400).json({ message: 'No image uploaded' });
        }

        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            console.log("user.image:", user.image);
            console.log("split:", user.image.split('/'));
            console.log("popped:", user.image.split('/').pop());
            console.log("split again:", user.image.split('/').pop().split('.'));
            console.log("PUBLICID: ", publicId);
            try {
                await cloudinary.uploader.destroy(`cursor-app/${publicId}`)
            } catch (err) {
                console.warn("Cloudinary deletion failed:", err.message);
            }
        }
        user.image = req.file.path;
        await user.save();
        console.log("File uploaded to Cloudinary:", req.file);
        res.status(200).json({ imageUrl: req.file.path });
    } catch (err) {
        console.error("Upload failed:", err.message);
        res.status(500).json({ message: 'Server error during image upload' });
    }
});