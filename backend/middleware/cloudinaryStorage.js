import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

export const profileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'cursor-app/profiles',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
})

export const blogStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'cursor-app/blogs',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
})
