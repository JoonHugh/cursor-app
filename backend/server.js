import express from 'express';
import dotenv from 'dotenv';
import blogs from './routes/blogRoutes.js';
import users from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
import uploadRoutes from './routes/imageRoutes.js';


const env = dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express()

app.use(cors({
    origin: "http://localhost:5001",
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/blogs', blogs)
app.use('/users', users)
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);
 
app.listen(PORT, console.log("Server running on port 5000"));