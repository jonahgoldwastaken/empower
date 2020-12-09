const { resolve } = require('path')
const { build } = require('esbuild')

const scriptsPath = resolve(__dirname, '../../build/_dist_/App.js')
const bundlePath = resolve(__dirname, '../App.js')

build({
  entryPoints: [scriptsPath],
  outfile: bundlePath,
  bundle: true,
}).then(() => console.log('ssr function build done'))
