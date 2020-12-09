const { resolve } = require('path')
const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { build } = require('esbuild')

const scriptPath = resolve(__dirname, '../../build')
const scriptNames = readdirSync(scriptPath).filter(
  file => file.slice(-2) === 'js'
)
const scripts = scriptNames.map(name => resolve(scriptPath, name))
const templatePath = resolve(__dirname, '../../build/index.html')
const bundlePath = resolve(__dirname, '../build')

build({ entryPoints: scripts, outdir: bundlePath, bundle: true }).then(() => {
  const bundle = {
    date: new Date(),
    script: scripts
      .map(script => readFileSync(resolve(bundlePath, script)))
      .join(''),
    template: readFileSync(templatePath, 'utf8'),
  }

  writeFileSync(
    resolve(__dirname, '../bundle.json'),
    JSON.stringify(bundle, null, 2)
  )
})
