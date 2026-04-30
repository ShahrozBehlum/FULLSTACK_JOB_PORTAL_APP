import jwt from 'jsonwebtoken'
import Company from '../models/Company.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';

const protectCompany = asyncHandler( async (req, res, next) => {

    let token = req.headers.token    

    if (!token) {
        throw new ApiError(401, "Not Authorized Login Again");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    const company = await Company.findById(decoded._id).select('-password')

    if (!company) {
        throw new ApiError(401, "Not authorized, company not found");
    }

    req.company = company

    next();

});

export default protectCompany;