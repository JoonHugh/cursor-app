import express from 'express';
import dotenv from 'dotenv';
import blogs from './routes/blogRoutes.js';
import users from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
import uploadRoutes from './routes/imageRoutes.js';
import cron from 'node-cron';
import Blog from "./models/blogModel.js";


const allowedOrigins = [
    'http://localhost:5173',  // Vite dev server default
    'http://localhost:5001',  // your custom port
    'https://cursor-app-beryl.vercel.app', // production frontend
    
]

const env = dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express()

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed for this origin: ' + origin));
        }
    },
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/blogs', blogs)
app.use('/users', users)
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

app.use(errorHandler);

cron.schedule("0 */6 * * *", async () => {
    const blogs = await Blog.find({});
    for (const blog of blogs) {
        blog.trendingScore = calculateTrendingScore(blog);
        await blog.save();
    }
})
 
app.listen(PORT, console.log(`Server running on port ${PORT}`));