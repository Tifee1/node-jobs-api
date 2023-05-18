import express from 'express'
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getSingleJob,
} from '../controllers/jobs'

const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)

router.route('/:id').get(getSingleJob).patch(editJob).delete(deleteJob)

export default router
