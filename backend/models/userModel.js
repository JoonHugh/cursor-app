import mongoose from 'mongoose';

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, 'Please add a name']
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
        default: '',
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
        default: '',
    },
    socials: {
        type: [String],
        default: '',
    },
}, {
    timestamps: true
} )


export default mongoose.model('User', userSchema);