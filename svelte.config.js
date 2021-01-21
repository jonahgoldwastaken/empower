const autoPreprocess = require('svelte-preprocess')

module.exports = {
  preprocess: autoPreprocess({
    typescript: false,
    postcss: {
      plugins: [require('postcss-import')(), require('autoprefixer')()],
    },
  }),
}
