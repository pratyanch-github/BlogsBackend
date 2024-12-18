import mongoose from "mongoose";
const followSchema = new mongoose.Schema({
    follower_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate follows
followSchema.index({ follower_id: 1, following_id: 1 }, { unique: true });

const FollowModel = mongoose.model('Follow', followSchema);
export default FollowModel;