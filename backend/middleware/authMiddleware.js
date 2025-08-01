import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] // Bearer in 1st index, token in 2nd index
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token 
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error("Not authorized");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})

// "Bearer jadiwadoawdaijdawoidad"