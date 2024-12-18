import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: 'default-profile.jpg'
    },
    bio: {
        type: String,
        maxLength: 500
    }
}, {
    timestamps: true // This will add created_at and updated_at fields
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;

