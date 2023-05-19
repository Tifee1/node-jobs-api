import express from 'express'
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getSingleJob,
  showStats,
} from '../controllers/jobs'
import testUserMiddleware from '../middleware/testUserAuth'

const router = express.Router()

router.route('/').get(getAllJobs).post(testUserMiddleware, createJob)

router.get('/stats', showStats)
router
  .route('/:id')
  .get(getSingleJob)
  .patch(testUserMiddleware, editJob)
  .delete(testUserMiddleware, deleteJob)

export default router
