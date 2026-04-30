// middlewares/protectUser.js
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const protectUser = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Not authorized, token missing");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
});

export default protectUser;