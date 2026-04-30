import {Router} from 'express'
import { getJobById, getJobs } from '../controllers/job.controller.js';

const router = Router()

//Route to get all jobs data
router.route('/').get(getJobs)

//Route to get a single job by id
router.route('/:id').get(getJobById)

export default router;