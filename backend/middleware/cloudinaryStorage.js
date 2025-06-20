import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'cursor-app',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
})

export default storage;