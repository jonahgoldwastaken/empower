const { MongoClient } = require('mongodb')
const { addLocationToMunicipality } = require('../utils/municipality')

const { MONGO_URI } = process.env

exports.handler = async function () {
  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const collection = client.db('empower').collection('municipalities')
    let result = await collection
      .find(
        {},
        {
          projection: {
            _id: 0,
          },
        }
      )
      .sort({ municipality: 1 })
      .toArray()

    result = result.map(addLocationToMunicipality)

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
