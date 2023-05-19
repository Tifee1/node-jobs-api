import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

import { BadRequest, NotFoundError } from '../error'
import JobsModel from '../model/jobs'

const getAllJobs = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const { search, sort, jobType, status } = req.query

  type objectQueryType = {
    createdBy: string
    position?: any
    status?: string
    jobType?: string
  }

  const objectQuery: objectQueryType = { createdBy: userId }

  if (search && search !== '') {
    objectQuery.position = { $regex: search, $options: 'i' }
  }

  if (status && status !== 'all') {
    objectQuery.status = String(status)
  }
  if (jobType && jobType !== 'all') {
    objectQuery.jobType = String(jobType)
  }

  let results = JobsModel.find(objectQuery)

  if (sort === 'latest') {
    results = results.sort('-createdAt')
  }
  if (sort === 'oldest') {
    results = results.sort('createdAt')
  }
  if (sort === 'a-z') {
    results = results.sort('position')
  }
  if (sort === 'z-a') {
    results = results.sort('-position')
  }

  const page = Number(req.query.page) || 1
  const lmit = Number(req.query.lmit) || 10
  const skip = (page - 1) * lmit

  results = results.limit(lmit).skip(skip)

  const jobs = await results

  const totalJobs = await JobsModel.countDocuments(objectQuery)

  const numOfPages = Math.ceil(totalJobs / lmit)

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
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

const showStats = async (req: Request, res: Response) => {
  type IStats = {
    _id: string
    count: number
  }

  const stats: IStats[] = await JobsModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])

  const formattedStats: Record<string, number> = stats.reduce((acc, curr) => {
    const { _id, count } = curr
    acc[_id] = count
    return acc
  }, {} as Record<string, number>)
  const defaultStats = {
    interview: formattedStats.interview || 0,
    declined: formattedStats.declined || 0,
    pending: formattedStats.pending || 0,
  }

  type MonthlyType = {
    _id: { year: number; month: number }
    count: number
  }

  const monthly: MonthlyType[] = await JobsModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1,
      },
    },
    { $limit: 8 },
  ])

  const monthlyApplications = monthly.map((item) => {
    const date = dayjs()
      .month(item._id.month - 1)
      .year(item._id.year)
      .format('MMM YYYY')
    return {
      date,
      count: item.count,
    }
  })

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { getAllJobs, getSingleJob, createJob, editJob, deleteJob, showStats }
