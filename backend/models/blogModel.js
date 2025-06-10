import mongoose from 'mongoose';

function countWords(str) {
    const matches = str.match(/\S+/g);
    return matches ? matches.length : 0;
  }

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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Must provide author'],
    },
    category: {
        type: String,
        default: 'General',
    },
    tags: [String],
    published: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    image: {
        type: String,
        default: '',
    },
    readTime: {
        type: String,
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
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        text: String,
        createdAt: {type: Date, default: Date.now },
    }],
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

blogSchema.pre('save', function (next) {
    if (this.content) {
        const res = Math.ceil(countWords(this.content) / 238) <= 1 ? "<1 min" : Math.ceil(countWords(this.content) / 238) + "mins";
        this.readTime = res;
    }
    next();
});



export default mongoose.model('Blog', blogSchema)