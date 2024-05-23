import { v4 as uuidv4 } from 'uuid'
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
const client = new S3Client({ region: 'us-east-2' })

const createBucket = async () => {
  const command = new CreateBucketCommand({
    Bucket: 'user-media-' + uuidv4()
  })

  try {
    const { Location } = await client.send(command)
    console.log(`Bucket created with location ${Location}`)
  } catch (err) {
    console.error(err)
  }
}
createBucket()
