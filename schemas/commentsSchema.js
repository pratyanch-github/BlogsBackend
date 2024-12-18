import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
