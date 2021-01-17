const autoPreprocess = require('svelte-preprocess')

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  plugins: [
    [
      '@snowpack/plugin-svelte',
      {
        preprocess: autoPreprocess({
          typescript: false,
          postcss: true,
        }),
      },
    ],
  ],
  devOptions: {
    open: 'false',
    port: 5000,
  },
  optimize: {
    bundle: true,
    minify: true,
    splitting: true,
    treeshake: true,
    target: 'es2017',
  },
}
