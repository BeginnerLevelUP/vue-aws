import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import * as Fs from 'fs'

const client = new DynamoDBClient({ region: 'us-east-2' })
const docClient = DynamoDBDocumentClient.from(client)

const seedUsers = async () => {
  console.log('Importing Users into DynamoDB. Please wait.')
  const allUsers = JSON.parse(Fs.readFileSync('./userSeeds.json', 'utf8'))

  allUsers.forEach(
    async (user: {
      userName: string
      createdAt: number
      userEmail: string
      userPassword: string
    }) => {
      const parameters = {
        TableName: 'Users',
        Item: {
          userName: user.userName,
          createdAt: user.createdAt,
          userEmail: user.userEmail,
          userPassword: user.userPassword
        }
      }
      const command = new PutCommand(parameters)

      try {
        const response = await docClient.send(command)
        console.log(response)
        return response
      } catch (error) {
        console.error('Error seeding User Table :', error)
      }
    }
  )
}
seedUsers()
