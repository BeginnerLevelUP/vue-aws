import { type Response, type NextFunction } from 'express'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'
import type CustomRequest from './customRequestInterface'

const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)
const table = 'Users'
export const getUserByUsername = async (req: CustomRequest, res: Response, next: NextFunction) => {
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
    if (req) req.currentUser = currentUser
    next()
  } catch (error) {
    res.status(500).send(`Error querying user ${usernameParam}: ${error}`)
    console.error(`Error querying user ${usernameParam}: ${error}`)
  }
}
