const { MongoClient } = require('mongodb')

const { MONGO_URI } = process.env

exports.handler = async function (event) {
  const { code } = event.queryStringParameters
  if (!code) {
    return {
      statusCode: 400,
      body: 'Provide a municipality code',
    }
  }

  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const collection = client.db('empower').collection('municipalities')
    const result = await collection.findOne({ code: +code })

    await client.close()

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (err) {
    console.log(err)

    return {
      statusCode: 500,
      body: 'Something went wrong, please try again.',
    }
  }
}
