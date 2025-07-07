import mongoose from 'mongoose';

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    username: {
        type: String,
        default: function() {
            return this.name;
        },
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    image: {
        type: String,
        default: '/assets/defaultprofilepic.jpg',
    },
    country: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: '',
    },
    about: {
        type: String,
        default: 'Some things about me...',
    },
}, {
    timestamps: true
} )

export default mongoose.model('User', userSchema);