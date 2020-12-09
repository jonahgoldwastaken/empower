const { resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { build } = require('esbuild')

const scriptsPath = resolve(__dirname, '../../build/_dist_/App.js')
const templatePath = resolve(__dirname, '../../build/index.html')
const bundlePath = resolve(__dirname, '../build/index.js')

build({ entryPoints: [scriptsPath], outfile: bundlePath, bundle: true }).then(
  () => {
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
  }
)
