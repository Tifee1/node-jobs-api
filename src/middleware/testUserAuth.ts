import { Unauthenticated } from '../error'
import { Request, Response, NextFunction } from 'express'

const testUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.testUser) {
    throw new Unauthenticated('Test User, Read Only')
  }
  next()
}

export default testUserMiddleware
