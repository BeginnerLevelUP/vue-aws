import * as express from 'express'
import { type Request, type Response } from 'express'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)
const table = 'Users'
export const userRouter = express.Router()

userRouter.get('/users', async (req: Request, res: Response) => {
  const command = new ScanCommand({
    TableName: table
  })

  try {
    const response = await docClient.send(command)
    res.status(200).send(`All Users: ${JSON.stringify(response)}`)
    console.log(`All Users: ${JSON.stringify(response)}`)
    return response
  } catch (error) {
    res.status(500).send(`Error Getting Users : ${error}`)
    console.error(`Error Getting Users : ${error}`)
  }
})
