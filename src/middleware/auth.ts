import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { Unauthenticated } from '../error'

const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Unauthenticated('Unauthorized request')
  }

  if (!process.env.JWT_SECRET_KEY)
    throw new Error('No env provided during development or production')
  try {
    const payload = jwt.verify(
      authHeader.split(' ')[1],
      process.env.JWT_SECRET_KEY
    ) as JwtPayload & { userId: any; name: string }

    req.user = { userId: payload.userId, name: payload.name }

    const testUser = req.user.userId === '6466d9047a17cd26ce2d0155'

    if (testUser) {
      req.user.testUser = testUser
    }

    next()
  } catch (error) {
    throw new Unauthenticated('Request Token not valid')
  }
}

export default authMiddleWare
