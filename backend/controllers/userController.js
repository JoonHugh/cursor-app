import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Register new user
// @route POST /users
// @access Public
export const registerUser  = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    } // if

    // Check if user exists
    const userExists = await User.findOne({ email })
    console.log('Backend response:', response.data); // In your update function

    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    } // if

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create  user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            about: user.about,
            gender: user.gender,
            country: user.country,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    
})

// @desc Authenticate a user
// @route POST /users/login
// @access Public
export const loginUser  = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check for user email
    const  user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            about: user.about,
            gender: user.gender,
            country: user.country,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    } // if-else

})

// @desc Get user data
// @route GET /users/me
// @access Private
export const getMe  = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id).select('-password'); // createdAt is included by default
    res.status(200).json(user);

})

// @descc Update user data
// @route PUT /users/me
// @access Private
export const updateMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    } // if

    const { name, email, password, about, gender, country } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    } // if
    if (about) user.about = about;
    if (gender) user.gender = gender;
    if (country) user.country = country;

    // Explicitly mark fields as modified if needed
    // user.markModified('about');
    // user.markModified('gender');
    // user.markModified('country');

    console.log('Before save:', user);
    const updatedUser = await user.save();
    console.log('After save:', updatedUser);


    res.status(200).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
        about: updatedUser.about,
        gender: updatedUser.gender,
        country: updatedUser.country,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}