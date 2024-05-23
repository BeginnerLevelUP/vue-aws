import { CreateTableCommand, DeleteTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({ region: 'us-east-2' })

const createUserTable = async () => {
  const command = new CreateTableCommand({
    TableName: 'Users',

    AttributeDefinitions: [
      {
        AttributeName: 'userName',
        AttributeType: 'S'
      },
      {
        AttributeName: 'createdAt',
        AttributeType: 'N'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'userName',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'createdAt',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  })

  try {
    const response = await client.send(command)
    console.log('Table Created : ', response)
    return response
  } catch (error) {
    console.error('Error creating table:', error)
    const command = new DeleteTableCommand({
      TableName: 'Users'
    })
    const response = await client.send(command)
    console.log('Delete Table Status : ', response)
  }
}
createUserTable()
