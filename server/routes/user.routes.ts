import * as express from 'express'
import { type Request, type Response, type NextFunction } from 'express'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)
const table = 'Users'
export const userRouter = express.Router()
//Create

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
    res.status(200).send(`User ${usernameParam}: ${JSON.stringify(response?.Items)}`)
    console.log(`User ${usernameParam}: ${JSON.stringify(response?.Items)}`)
    return response
  } catch (error) {
    res.status(500).send(`Error Getting User ${usernameParam} : ${error}`)
    console.error(`Error Getting User ${usernameParam} : ${error}`)
  }
  next()
})

//Update
userRouter.put('/users/:username', async (req: Request, res: Response, next: NextFunction) => {
  const usernameParam = req?.params?.username

  const queryCommand = new QueryCommand({
    TableName: table,
    KeyConditionExpression: 'userName = :param',
    ExpressionAttributeValues: {
      ':param': usernameParam
    },
    ConsistentRead: true
  })

  try {
    const response = await docClient.send(queryCommand)
    const currentUser: { [key: string]: any } = response?.Items?.[0] ?? {}

    const updateExpression =
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
    res.status(200).send(`Update User ${usernameParam} : ${JSON.stringify(updateResponse)}`)
    console.log(`Update User ${usernameParam} : ${JSON.stringify(updateResponse)}`)
  } catch (error) {
    res.status(500).send(`Error Updating User ${usernameParam} : ${error}`)
    console.error(`Error Updating User ${usernameParam} : ${error}`)
  }

  next()
})

//Delte
