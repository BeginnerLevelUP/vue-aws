import * as express from 'express'
import * as multer from 'multer'
import { type StorageEngine } from 'multer'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { type Request, type Response, type NextFunction } from 'express'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type CustomRequest from '../utils/customRequestInterface'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'
import { getUserByUsername } from '../utils/userMiddleware'

const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)
const table = 'Users'
dotenv.config()

const uploadClient = new S3Client({ region: 'us-east-2' })
const storage: StorageEngine = multer.memoryStorage()
const upload = multer({ storage }).single('media')

const params = (fileName: Express.Multer.File) => {
  const myFile = fileName?.originalname.split('.')
  const fileType = myFile[myFile.length - 1]

  const mediaParams = {
    Bucket: process.env['BUCKET_NAME'],
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer
  }

  return mediaParams
}

export const userRouter = express.Router()
//Read
userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const command = new ScanCommand({
    TableName: table
  })

  try {
    const response = await docClient.send(command)
    res.status(200).send(`All Users: ${JSON.stringify(response?.Items)}`)
    console.log(`All Users: ${JSON.stringify(response)}`)
    return response
  } catch (error) {
    res.status(500).send(`Error Getting Users : ${error}`)
    console.error(`Error Getting Users : ${error}`)
  }
  next()
})

userRouter.get('/users/:username', async (req: Request, res: Response, next: NextFunction) => {
  const usernameParam = req?.params?.username
  const command = new QueryCommand({
    TableName: table,
    KeyConditionExpression: 'userName=:param',
    ExpressionAttributeValues: {
      ':param': usernameParam
    },
    ConsistentRead: true
  })
  try {
    const response = await docClient.send(command)
res.status(200).json(response?.Items?.[0] || {})
    console.log(`User ${usernameParam}: ${JSON.stringify(response?.Items)}`)
    return response
  } catch (error) {
    res.status(500).send(`Error Getting User ${usernameParam} : ${error}`)
    console.error(`Error Getting User ${usernameParam} : ${error}`)
  }
  next()
})

userRouter.put(
  '/users/:username',
  getUserByUsername,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const usernameParam = req?.currentUser?.userName
    const currentUser: { [key: string]: any } = req?.currentUser ?? {}
    try {
      let updateExpression =
        'set ' +
        Object.keys(currentUser)
          .filter((key) => key !== 'userName' && key !== 'createdAt') // Exclude userName and createdAt from update
          .map((key) => `${key} = :${key}`)
          .join(', ')

      const expressionAttributeValues: { [key: string]: any } = {}
      Object.keys(currentUser).forEach((key) => {
        if (key !== 'userName' && key !== 'createdAt') {
          // Exclude userName and createdAt from expressionAttributeValues
          expressionAttributeValues[`:${key}`] = req.body[key] ?? currentUser[key]
        }
      })

      // Adding new properties from req.body to the update expression and attribute values
      Object.keys(req.body).forEach((key) => {
        if (!(key in currentUser)) {
          updateExpression += `, ${key} = :${key}`
          expressionAttributeValues[`:${key}`] = req.body[key]
        }
      })

      const updateCommand = new UpdateCommand({
        TableName: table,
        Key: {
          userName: usernameParam,
          createdAt: currentUser?.createdAt
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      })

      const updateResponse = await docClient.send(updateCommand)
      res.status(200).json(updateResponse)
      console.log(`Update User ${usernameParam} : ${JSON.stringify(updateResponse)}`)
    } catch (error) {
      res.status(500).send(`Error Updating User ${usernameParam} : ${error}`)
      console.error(`Error Updating User ${usernameParam} : ${error}`)
    }

    next()
  }
)


// Delete
userRouter.delete(
  '/users/:username',
  getUserByUsername,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const usernameParam = req?.currentUser?.userName
    const currentUser: { [key: string]: any } = req?.currentUser ?? {}
    const command = new DeleteCommand({
      TableName: table,
      Key: {
        userName: currentUser?.userName,
        createdAt: currentUser?.createdAt
      }
    })
    try {
      const response = await docClient.send(command)
      res.status(200).send(`User ${usernameParam} deleted: ${JSON.stringify(response)}`)
      console.log(`User ${usernameParam} deleted: ${JSON.stringify(response)}`)

      return response
    } catch (error) {
      res.status(500).send(`Error Deleting User ${usernameParam} : ${error}`)
      console.error(`Error Deleting User ${usernameParam} : ${error}`)
    }
    next()
    next()
  }
)
//Create
userRouter.post(
  '/users/:username/media-upload',
  getUserByUsername,
  upload,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.file) {
      res.status(400).send('No file uploaded.')
      return
    }
    const currentUser = req.currentUser
    const fileParams = params(req.file)
    const uploadCommand = new PutObjectCommand(fileParams)
    const updateCommand = new UpdateCommand({
      TableName: table,
      Key: {
        userName: currentUser?.userName,
        createdAt: currentUser?.createdAt
      },
      UpdateExpression: 'set profileImageUrl = :url',
      ExpressionAttributeValues: {
        ':url': `https://${process.env['BUCKET_NAME']}.s3.us-east-2.amazonaws.com/${fileParams.Key}`
      },
      ReturnValues: 'ALL_NEW'
    })
    try {
      const updateResponse = await docClient.send(updateCommand)
      const uploadResponse = await uploadClient.send(uploadCommand)
      res.status(200).json(updateResponse || {})
      console.log(`File  uploaded: ${JSON.stringify(uploadResponse)}
            Profile Image Url added to User: ${JSON.stringify(updateResponse)}
        `)
      return uploadResponse
    } catch (error) {
      res.status(500).send(`Error Uploading File  : ${error}`)
      console.error(`Error Uploading File : ${error}`)
    }
    next()
  }
)
