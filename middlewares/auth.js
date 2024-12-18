import jwt from 'jsonwebtoken';
// import User from '../schemas/userSchema.js';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {

        // verify token
        // console.log(req.header('Authorization'), process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        req.user = decoded.user;

        // for passing data to next middleware 
        req.userid = decoded.user.id;
        next();
    }
    catch (e) {
        res.status(401).json({ "Token is not valid": "", [e.message]: e.message });
    }

}

export default authMiddleware;