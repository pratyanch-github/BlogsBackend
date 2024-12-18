import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogsdb');
        console.log('db connected');
    }
    catch (e) {
        console.log(e);
    }
}

