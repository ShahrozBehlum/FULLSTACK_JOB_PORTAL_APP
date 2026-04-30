import {Router} from 'express';
import { applyForJob, getUserData, getUserJobsApplication, loginUser, registerUser, updateUserResume } from '../controllers/user.controller.js';
import upload from '../config/multer.js';
import protectUser from '../middlewares/userAuth.middleware.js';

const router = Router();


// register a user
router.route("/register").post(
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    registerUser
);

//login a user
router.route('/login').post(loginUser);

// Get user data
router.route('/user').get(protectUser, getUserData)

// Apply for a job
router.route('/apply').post(protectUser, applyForJob)

// Get applied jobs data
router.route('/applications').get(protectUser, getUserJobsApplication)

// Update user profile (resume)
router.route('/update-resume').post(upload.single('resume'),protectUser, updateUserResume)

export default router;