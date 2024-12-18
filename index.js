import { connectDb } from './config/db.js';
import authrouter from './routes/auth.js';

import express from 'express';
const app = express();



import defaultenv from 'dotenv';
import blogRouter from './routes/blogs.js';
defaultenv.config();  // call confing function of dotenv to access process.env
// or import 'dotenv/config'

app.use(express.json());
app.get('/', (req, res) => {
    res.status(400).json({ message: 'connected ' });
})
app.use('/auth', authrouter);
app.use('/blogs', blogRouter);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
    console.log('server started at :' + port);
    await connectDb();

})
