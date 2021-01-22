/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  plugins: ['@snowpack/plugin-svelte'],
  devOptions: {
    open: 'false',
    port: 5000,
  },
  optimize: {
    entrypoints: 'auto',
    bundle: true,
    minify: true,
    splitting: true,
    treeshake: true,
  },
}
