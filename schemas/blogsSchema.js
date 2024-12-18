import mongoose from "mongoose";


// 1. connect to database before calling any operation on model
// 2. create schema
// 3. complie this schema into a model 

// Blogs Collection
// {
//     _id: ObjectId,
//     title: String,
//     content: String,
//     author_id: ObjectId (reference to Users),
//     categories: [ObjectId] (array of category IDs),
//     status: String (draft/published),
//     read_time: Number,
//     views: Number,
//     created_at: Timestamp,
//     updated_at: Timestamp
//   }


// models/Blog.js
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    read_time: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const BlogModel = mongoose.model('Blog', blogSchema);
export default BlogModel;
