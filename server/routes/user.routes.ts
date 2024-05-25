import * as express from 'express'
import * as multer from 'multer'
import { type StorageEngine } from 'multer'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { type Response, type NextFunction } from 'express'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type CustomRequest from '@/utils/customRequestInterface'
dotenv.config()

const client = new S3Client({ region: 'us-east-2' })
const storage: StorageEngine = multer.memoryStorage()
const upload = multer({ storage }).single('image')

const params = (fileName: Express.Multer.File) => {
  const myFile = fileName?.originalname.split('.')
  const fileType = myFile[myFile.length - 1]

  const imageParams = {
    Bucket: process.env['BUCKET_NAME'],
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer
  }

  return imageParams
}

export const userRouter = express.Router()

userRouter.post(
  '/image-upload',
  upload,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.file) {
      res.status(400).send('No file uploaded.')
      return
    }
    const fileParams = params(req.file)
    const command = new PutObjectCommand(fileParams)
    try {
      const response = await client.send(command)
      res
        .status(200)
        .send(`File ${JSON.stringify(fileParams)} uploaded: ${JSON.stringify(response)}`)
      console.log(`File ${JSON.stringify(fileParams)} uploaded: ${JSON.stringify(response)}`)
      return response
    } catch (error) {
      res.status(500).send(`Error Uploading File -  ${JSON.stringify(fileParams)} : ${error}`)
      console.error(`Error Uploading File - ${JSON.stringify(fileParams)} : ${error}`)
    }
    next()
  }
)
