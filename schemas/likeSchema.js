import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Compound index to prevent multiple likes from same user on same blog
likeSchema.index({ blog_id: 1, user_id: 1 }, { unique: true });

const LikeModel = mongoose.model('Like', likeSchema);
export default LikeModel;
