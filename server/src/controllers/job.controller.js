import Job from "../models/job.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



// Get all jobs
export const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ visible: true })
        .populate({ path: 'companyId', select: '-password' }); // Ensure 'companyId' exists in Job schema
        // console.log(JSON.stringify(jobs, null, 2));

    return res.status(200).json({
        success: true,
        jobs,
        message: "Jobs fetched successfully"
    });
});

//Get single job by id
export const getJobById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id)
        .populate('companyId', '-password')
        .lean();

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200).json({
        success: true,
        job,
        message: "Job fetched successfully"
    });
});