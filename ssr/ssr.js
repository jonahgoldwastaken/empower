const app = require('./App.js')

exports.handler = async function (event) {
  const qs = Object.entries(event.queryStringParameters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  const { html } = await app.render({ url: `${event.path}?${qs}` })
  const body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EMPOWER 2.0</title>
      </head>
      <body>
        <div id="app">
          ${html}
        </div>
        <noscript>You need JavaScript to run this app.</noscript>
        <script type="module" src="_dist_/index.js"></script>
      </body>
    </html>
  `

  return {
    body,
    statusCode: 200,
  }
}
