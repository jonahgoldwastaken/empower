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
    '@snowpack/plugin-webpack',
  ],
  devOptions: {
    open: 'false',
    port: 5000,
  },
}
