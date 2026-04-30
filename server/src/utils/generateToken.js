import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'


const generateToken = (id) => {
 
    return jwt.sign(
        {_id:id}, 
        process.env.TOKEN_SECRET,
        {expiresIn: process.env.TOKEN_EXPIRE_IN} 
    )

};

export default generateToken;