import User from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import ApiResponse from '../utils/ApiResponse.js';
import generateToken from '../utils/generateToken.js';
import JobApplication from "../models/JobApplication.model.js";
import Job from "../models/Job.model.js";

//Register a new company
export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const imageFile = req.files?.image?.[0];

    if (!name || !email || !password || !imageFile) {
        throw new ApiError(400, "Missing Details")
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        throw new ApiError(400, "User Already Registred")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "users/images"
    });


    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image: imageUpload.secure_url
    });

    // Send response
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
                token: generateToken(user._id),
            },
            "User Registered Successfully"
        )
    );

});

//user Login
export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
                token: generateToken(user._id),
            },
            "User logged in successfully"
        )
    );
});


//Get user data
export const getUserData = asyncHandler(async (req, res) => {

    const userId = req.user._id

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(400, "user Not Found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User Data Fetched Successfully"
        )
    );

});


// Apply for a job
export const applyForJob = asyncHandler(async (req, res) => {

    const { jobId } = req.body

    const userId = req.user._id

    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId })

    if (isAlreadyApplied) {
        return res.status(200).json({
        success: false,
        message: "Already Applied"
    });
    }

    const jobData = await Job.findById(jobId)

    if (!jobData) {
        throw new ApiError(400, "Job Not Found")
    }

    await JobApplication.create({
        companyId: jobData.companyId,
        userId,
        jobId,
        date: Date.now(),

    })

    return res.status(201).json(
        new ApiResponse(
            201,
            "applied Successfully"
        )
    );

});


// Get user applied applications
export const getUserJobsApplication = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const applications = await JobApplication.find({ userId })
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary');

    // FIX: find() always returns an array, never null
    if (applications.length === 0) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "No job applications found"
            )
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            applications,
            "Job applications fetched successfully"
        )
    );
});
// update user profile (resume)
export const updateUserResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "raw",
    folder: "resumes",
  });

  user.resume = result.secure_url;
  await user.save();

  res.status(200).json(
    new ApiResponse(200, { resume: user.resume }, "Resume updated successfully")
  );
});