import express, { Application, Request, Response, NextFunction } from 'express'

import 'express-async-errors'

import path from 'path'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import xssClean from 'xss-clean'

import errorHandlerMiddleWare from './middleware/error-handler'
import notFound from './middleware/not-found'
import userRouter from './routes/user'
import jobsRouter from './routes/jobs'
import connectDB from './db/connectDB'
import authMiddleWare from './middleware/auth'

dotenv.config()

// Boot express
const app: Application = express()
const port = process.env.PORT || 5000

// Application routing
// app.use(express.static('./public'))

app.set('trust proxy', 1)

app.use(express.static(path.resolve(__dirname, '../client/dist')))

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssClean())

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/jobs', authMiddleWare, jobsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

app.use(errorHandlerMiddleWare)
app.use(notFound)

const start = async () => {
  if (!process.env.MONGODB_URI) throw new Error(`No mongodb uri provided`)
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}!`))
  } catch (error) {
    console.log(error)
  }
}

start()

// Start server
