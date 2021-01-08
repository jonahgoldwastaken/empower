const { MongoClient } = require('mongodb')

const { MONGO_URI } = process.env

exports.handler = async function (event) {
  const { mainCity, compareCity } = event.queryStringParameters
  if (!mainCity || !compareCity) {
    return {
      statusCode: 400,
      body: 'Provide both a mainCity and compareCity',
    }
  }

  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const collection = client.db('empower').collection('municipalities')
    const result = {
      mainCity: await collection.findOne({
        municipality: new RegExp(`^${mainCity}$`, 'i'),
      }),
      compareCity: await collection.findOne({
        municipality: new RegExp(`^${compareCity}$`, 'i'),
      }),
    }

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
