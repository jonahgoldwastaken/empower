const { tossr } = require('tossr')
const { script, template } = require('./bundle.json')

exports.handler = async function (event) {
  const qs = Object.entries(event.queryStringParameters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  const body = await tossr(template, script, `${event.path}?${qs}`)
  return {
    body,
    statusCode: 200,
  }
}
