import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { BadRequest, Unauthenticated } from '../error'
import UserModel from '../model/user'

const registerUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body
  // if (!email || !name || !password) {
  //   throw new BadRequest('Please provide email and password')
  // }
  const user = await UserModel.create({ email, name, password })
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastName: user.lastName,
      token,
    },
  })
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequest('Please provide email and password')
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Unauthenticated('User not found')
  }
  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new Unauthenticated('Password not correct')
  }
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastName: user.lastName,
      token,
    },
  })
}

export { loginUser, registerUser }
