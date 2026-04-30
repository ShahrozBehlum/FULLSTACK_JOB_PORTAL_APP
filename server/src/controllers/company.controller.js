import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';
import Company from '../models/Company.model.js';
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import ApiResponse from '../utils/ApiResponse.js';
import generateToken from '../utils/generateToken.js';
import Job from '../models/job.model.js';
import JobApplication from '../models/JobApplication.model.js';

//Register a new company
export const registerCompany = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        throw new ApiError(400, "Missing Details")
    }

    const companyExist = await Company.findOne({ email })

    if (companyExist) {
        throw new ApiError(400, "Company Already Registred")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)

    const company = await Company.create({
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
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
                token: generateToken(company._id)
            },
            "Company Registered Successfully"
        )
    );

});

//company Login
export const loginCompany = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Missing Details")
    }

    const company = await Company.findOne({ email })
    if (!company) {
        throw new ApiError(400, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid email or password");
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image,
                },
                token: generateToken(company._id)
            },
            "Company Login Successfully"
        )
    );
});

//Get Company Data
export const getCompanyData = asyncHandler(async (req, res) => {

    const company = req.company;

    return res.status(200).json(
        new ApiResponse(
            200,
            company,
            "Company Data Fetched Successfully"
        )
    );

});

//Post a new job
export const postJob = asyncHandler(async (req, res) => {

    const { title, description, salary, location, level, category } = req.body;

    const companyId = req.company._id

    // console.log(companyId, {title, description, salary, location});

    const newJob = new Job({
        title,
        description,
        location,
        salary,
        companyId,
        date: Date.now(),
        level,
        category
    })

    await newJob.save();

    return res.status(201).json(
        new ApiResponse(
            201,
            newJob,
            "New Job Posted Successfully"
        )
    );

});

//Get company job applicants
export const getCompanyJobApplications = asyncHandler(async (req, res) => {

    const companyId = req.company._id;

    //find job applications for the user and populate related data
    const applications = await JobApplication.find({ companyId })
        .populate('userId', 'name image resume')
        .populate('jobId', 'title location category level salary')
        .exec()



    return res.status(200).json({
        success: true,
        applicants: applications,
        message: "Job applications fetched successfully"
    });
});

//Get Company Posted Jobs
export const getCompanyPostedJobs = asyncHandler(async (req, res) => {

    const companyId = req.company._id;

    const jobs = await Job.find({ companyId })

    // Adding No. of applicants info in data
    const jobsData = await Promise.all(jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id })
        return { ...job.toObject(), applicants: applicants.length }
    }))

    return res.status(200).json(
        new ApiResponse(
            200,
            jobsData,
            "Posted Jobs Fetched Successfully"
        )
    );

});

//Change Job Application Status
export const changeJobApplicationStatus = asyncHandler(async (req, res) => {

    const {id, status} = req.body;

    await JobApplication.findByIdAndUpdate({_id: id}, {status})

    res.json({success: true, message: 'Status Changed'})

});

//Change Job Visibility
export const changeJobVisibility = asyncHandler(async (req, res) => {

    const { id } = req.body;

    const companyId = req.company._id

    const job = await Job.findById(id)

    if (!job) {
        throw new ApiError(404, 'Job not found')
    }

    if (job.companyId.toString() !== companyId.toString()) {
        throw new ApiError(403, "You are not allowed to modify this job");
    }

    job.visible = !job.visible

    await job.save()

    return res.status(201).json(
        new ApiResponse(
            201,
            job,
            "Job visibility updated successfully"
        )
    );

});