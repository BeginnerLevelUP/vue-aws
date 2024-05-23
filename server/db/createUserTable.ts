import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: 'us-east-2' })

const createUserTable=async()=>{
      const command = new CreateTableCommand({
    TableName: "Users",

    AttributeDefinitions: [
      {
        AttributeName: "userName",
        AttributeType: "S",
      },
        {
        AttributeName: "userEmail",
        AttributeType: "S",
      },
              {
        AttributeName: "userPassword",
        AttributeType: "S",
      },
              {
        AttributeName: "createAt",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "userName",
        KeyType: "HASH",
      },
      {
        AttributeName:'createAt',
        keyType:"RANGE"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
}