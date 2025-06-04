import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Must provide author'],
    },
    category: {
        type: String,
        default: 'General',
    },
    tags: [String],
    image: {
        type: String,
        default: '',
    },
    published: {
        type: Boolean,
        default: false,
    },
    readTime: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    comments: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: {type: Date, default: Date.now },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
})

export default mongoose.model('Blog', blogSchema)