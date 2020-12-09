exports.handler = async function (event) {
  console.log(__dirname, process.cwd())
  const app = await import('../../_dist_/App.js').default
  const { html } = app.render({ url: event.path })
  const body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EMPOWER 2.0</title>
      </head>
      <body>
        <noscript>You need JavaScript to run this app.</noscript>
        <script type="module" src="_dist_/index.js"></script>
        ${html}
      </body>
    </html>
    
  `
  return {
    body,
    statusCode: 200,
  }
}
