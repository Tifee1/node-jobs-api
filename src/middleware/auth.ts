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

    next()
  } catch (error) {
    throw new Unauthenticated('Unauthorized request')
  }
}

export default authMiddleWare
