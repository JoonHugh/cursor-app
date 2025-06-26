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
    trendingScore: {
        type: Number,
        default: 0,
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

function calculateTrendingScore(blog) {
    const { likes = 0, comments = [], views = 0, createdAt = newDate() } = blog;
    console.log("Likes:", likes, "Comments:", comments.length, "Views:", views, "CreatedAt:", createdAt);

    // time that's passed in hours
    const hoursSincePosted = Math.max(
        (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60),
        0.1
    )
    console.log("Hours since posted:", hoursSincePosted);

    // how to calculate what blogs should be trending
    const engagementScore = (likes * 1) + (comments.length * 2) + (views * 0.5); 
    console.log("Engagement score:", engagementScore);

    // trending score (time decay = 1.5)
    const trendingScore = engagementScore / Math.pow(hoursSincePosted + 1, 1.5);
    console.log("Trending score:", trendingScore);

    return trendingScore
}

blogSchema.pre('save', function (next) {
    if (this.content) {
        const res = Math.ceil(countWords(this.content) / 238) <= 1 ? "<1 min" : Math.ceil(countWords(this.content) / 238) + " mins";
        this.readTime = res;
    }
    this.trendingScore =  calculateTrendingScore(this);
    next();
});

blogSchema.pre('findOneAndUpdate', async function (next) {
    const update = this._update;
    if (update.$inc?.likes || update.$inc?.views || update.$push?.comments) {
        const blog = await this.model.findOne(this.getQuery());
        const updatedData = {
            ...blog.toObject(),
            ...update.$set,
            likes: blog.likes + (update.$inc?.likes || 0), 
            views: blog.views + (update.$inc?.views || 0), 
            comments: update.$push?.comments 
            ? [...blog.comments, update.$push.comments] 
            : blog.comments, 
        }
    };
    this._update.$set = {
        ...this._update.$set,
        trendingScore: calculateTrendingScore(updatedData),
    }
    next();
})



export default mongoose.model('Blog', blogSchema)