import * as express from 'express'
import { type Request, type Response, type NextFunction } from 'express'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)
const table = 'Users'
export const userRouter = express.Router()

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
      ":param": usernameParam
    },
    ConsistentRead: true
  })
  try {
    const response = await docClient.send(command)
    res.status(200).send(`User ${usernameParam}: ${JSON.stringify(response)}`)
    console.log(`User ${usernameParam}: ${JSON.stringify(response?.Items)}`)
    return response
  } catch (error) {
    res.status(500).send(`Error Getting User ${usernameParam} : ${error}`)
    console.error(`Error Getting User ${usernameParam} : ${error}`)
  }
  next()
})
