import express from 'express'
import { loginUser, registerUser, updateUser } from '../controllers/user'
import authMiddleWare from '../middleware/auth'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.patch('/updateUser', authMiddleWare, updateUser)

export default router
