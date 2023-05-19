import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { BadRequest, NotFoundError } from '../error'
import JobsModel from '../model/jobs'

const getAllJobs = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const jobs = await JobsModel.find({ createdBy: userId }).sort('createdAt')

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getSingleJob = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const jobId = req.params.id

  const job = await JobsModel.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const { company, position, jobLocation, jobType, status } = req.body
  if (!company || !position) {
    throw new BadRequest('Please fill all values')
  }
  const job = await JobsModel.create({
    company,
    position,
    jobLocation,
    jobType,
    status,
    createdBy: userId,
  })
  res.status(StatusCodes.CREATED).json({ job })
}
const editJob = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const jobId = req.params.id

  const job = await JobsModel.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const jobId = req.params.id

  const job = await JobsModel.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ msg: 'Job Deleted' })
}

export { getAllJobs, getSingleJob, createJob, editJob, deleteJob }
