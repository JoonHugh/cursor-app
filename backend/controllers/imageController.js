import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {

    try {
        const user = req.user;
        if (!req.file) {
            console.error("No file found in request");
            return res.status(400).json({ message: 'No image uploaded' });
        }

        if (user.image) {
            const match = user.image.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
        
            if (match && match[1]) {
                const publicId = match[1];
                console.log("PUBLIC ID", publicId);
                // https://res.cloudinary.com/dallthlw3/image/upload/v1750727718/cursor-app/owxxji22ius2ysu0ukia.png
                try {
                    await cloudinary.uploader.destroy(publicId);
                    console.log("✅ Previous image deleted:", publicId);
                } catch (err) {
                    console.warn("⚠️ Cloudinary deletion failed:", err.message);
                }
            } else {
                console.warn("⚠️ Could not extract publicId from:", user.image);
            }
        }
        console.log("PUBLIC ID", publicId);
        user.image = req.file.path;
        await user.save();
        console.log("File uploaded to Cloudinary:", req.file);
        res.status(200).json({ imageUrl: req.file.path });
    } catch (err) {
        console.error("Upload failed:", err.message);
        res.status(500).json({ message: 'Server error during image upload' });
    }
});