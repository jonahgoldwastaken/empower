exports.handler = async function (event) {
  const { mainCity, compareCity } = event.queryStringParameters
  if (!mainCity || !compareCity) {
    return {
      statusCode: 400,
      body: 'Provide both a mainCity and compareCity',
    }
  }
  return {
    statusCode: 200,
    body: 'hi',
  }
}
