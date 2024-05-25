import { type Request } from 'express'
export default interface CustomRequest extends Request {
  currentUser?: { [key: string]: any }
}
