import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import express from 'express';
import authMiddleware from "../middlewares/auth.js";
import BlogModel from '../schemas/blogsSchema.js';


const blogRouter = express.Router();

blogRouter.post('/create', authMiddleware, async (req, res) => {
    // from authmiddleware we get req.userid as userid
    let { title, content, author_id, statu, read_time, views } = req.body;
    console.log(req.body);
    try {
        let newblog = new BlogModel({ title, content, author_id: req.userid, read_time, views });
        await newblog.save();

        res.status(200).json({ message: 'Blog Created Successfully', blogDetails: newblog });
    } catch (e) {
        res.status(400).json({ message: 'creation failed', error: e.message });
    }
})
blogRouter.get('/', (req, res) => {
    res.status(400).json('working blog');
})



export default blogRouter;

