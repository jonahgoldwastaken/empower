/**
 * Creates a JSON and inlines it with esbuild for ssr.js to consume
 * {
 *   data: duh,
 *   script: inlined main.js
 *   template: __app.html
 * }
 */

const { resolve } = require('path')
const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { build } = require('esbuild')

const buildPath = resolve(__dirname, '../../build')
const entryPoints = [
  resolve(
    buildPath,
    readdirSync(buildPath).find(file => file.slice(-2) === 'js')
  ),
]

const templatePath = resolve(__dirname, '../../build/index.html')
const bundlePath = resolve(__dirname, '../build/index.js')

build({ entryPoints, outfile: bundlePath, bundle: true }).then(() => {
  const bundle = {
    date: new Date(),
    script: bundlePath,
    template: readFileSync(templatePath, 'utf8'),
  }

  writeFileSync(
    resolve(__dirname, '../bundle.json'),
    JSON.stringify(bundle, null, 2)
  )
})
