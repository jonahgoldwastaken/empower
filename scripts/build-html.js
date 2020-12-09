const { resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const buildPath = resolve(__dirname, '../build')
const manifestJSON = resolve(buildPath, 'manifest.json')
const htmlFile = resolve(buildPath, 'index.html')

const manifest = JSON.parse(readFileSync(manifestJSON))
const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMPOWER 2.0</title>
    <link rel="stylesheet" href="${manifest.entrypoints.index.css}" />
  </head>
  <body>
    <noscript>You need JavaScript to run this app.</noscript>
    <script type="module" src="${manifest.entrypoints.index.js}"></script>
  </body>
  </html>
`

writeFileSync(htmlFile, template)
