import { Router } from 'express'
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplications, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/company.controller.js';
import upload from '../config/multer.js';
import protectCompany from '../middlewares/auth.middleware.js';

const router = Router();

//register a company
router.route('/register').post(upload.single('image'), registerCompany);

//login a company
router.route('/login').post(loginCompany);

//get company data
router.route('/company').get(protectCompany, getCompanyData);

//post a job
router.route('/post-job').post(protectCompany, postJob);

//register a company
router.route('/applicants').get(protectCompany, getCompanyJobApplications);

//get company job list
router.route('/list-jobs').get(protectCompany, getCompanyPostedJobs);

//change applications status
router.route('/change-status').post(protectCompany, changeJobApplicationStatus);

//change application visibility
router.route('/change-visibility').post(protectCompany, changeJobVisibility);

export default router;
