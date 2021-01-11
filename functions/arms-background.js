const AWS = require('aws-sdk')
const got = require('got')
const stream = require('stream')
const { promisify } = require('util')

const pipeline = promisify(stream.pipeline)

exports.handler = async function (event) {
  const { originalURL, newKey } = event.queryStringParameters
  const { BB_KEYID, BB_APPKEY } = process.env
  AWS.config.credentials = {
    accessKeyId: BB_KEYID,
    secretAccessKey: BB_APPKEY,
  }
  const s3 = new AWS.S3({
    endpoint: 's3.eu-central-003.backblazeb2.com',
  })
  const pass = new stream.PassThrough()
  pipeline(got.stream(originalURL), pass)
  await s3
    .upload({
      Bucket: 'empower',
      Key: newKey,
      Body: pass,
      ContentType: 'image/svg+xml',
    })
    .promise()
}
