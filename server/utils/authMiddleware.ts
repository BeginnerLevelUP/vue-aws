
import * as jwt from 'jsonwebtoken'
import { type JwtPayload } from 'jsonwebtoken'
import { type Response, type NextFunction } from 'express'
import type CustomRequest from './customRequestInterface'
const expiration = '1d'
const secret = process.env['JWT_KEY'] || ''
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  let token = req.body.token || req.query.token || req.headers.authorization

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim()
  }

  if (!token) {
    return next()
  }

  try {
    const decoded = jwt.verify(token, secret, { maxAge: expiration })
    req.currentUser = (decoded as JwtPayload).data
  } catch {
    console.log('Invalid token')
  }

  return next()
}
