const { MongoClient } = require('mongodb')
const { MONGO_URI } = process.env

exports.handler = async function (event) {
  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const collection = client.db('empower').collection('municipalities')
    const result = await collection
      .find(
        {},
        {
          fields: {
            totalEnergyGeneration: 1,
            code: 1,
            municipality: 1,
            _id: 0,
          },
        }
      )
      .toArray()
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Something went wrong, please try again.',
    }
  }
}
