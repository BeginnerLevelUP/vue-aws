import * as express from 'express'
import { type Request, type Response, type NextFunction } from 'express'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { getUserByUsername } from '../utils/userMiddleware'
import type CustomRequest from '../utils/customRequestInterface'
import type User from '../utils/userInterface'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)
const table = 'Users'
const expiration = '1d'
const secret = process.env['JWT_TOKEN'] || 'why'
export const authRouter = express.Router()

// Signup route
authRouter.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
  // Extract username and password from request body
  const { userName, userPassword, userEmail } = req.body
  const hashedPassword = await bcrypt.hash(userPassword, 10)
  const newUser: User = {
    userName,
    userEmail,
    userPassword: hashedPassword,
    createdAt: new Date().getTime(),
    firstName:'',
    lastName:'',
  }

  const command = new PutCommand({
    TableName: table,
    Item: newUser
  })
  try {
    const response = await docClient.send(command)
    const token = jwt.sign({ data: newUser }, secret, { expiresIn: expiration })
    res.status(200).json({ token })
    console.log(`User created: ${token}`)
    return response
    next()
  } catch (error) {
    res.status(500).send(`Error Creating User : ${error}`)
    console.error(`Error Creating User : ${error}`)
    next(error)
  }
})

// Sign-in route
authRouter.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  const { userName, userPassword } = req.body

  // Query DynamoDB to get user with the provided username
  const queryCommand = new QueryCommand({
    TableName: table,
    KeyConditionExpression: 'userName = :userName',
    ExpressionAttributeValues: {
      ':userName': userName
    }
  })

  try {
    const { Items } = await docClient.send(queryCommand)

    if (!Items || Items.length === 0) {
      res.status(401).send('User not found')
      return
    }

    const user = Items[0]

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword)

    if (!passwordMatch) {
      res.status(401).send('Invalid password')
      return
    }

    // Generate JWT token
    const token = jwt.sign({ data: user }, secret, { expiresIn: expiration })
    res.status(200).json({ token })
    console.log(`Login successful: ${token}`)
    next()
  } catch (error) {
    res.status(500).send(`Error Logging In: ${error}`)
    console.error(`Error Logging In: ${error}`)
    next(error)
  }
})
