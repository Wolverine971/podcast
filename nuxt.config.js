// import colors from 'vuetify/es5/util/colors'
import getRoutes from './utils/getRoutes'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'content-language', content: 'en' },
      // {
      //   name: 'google-signin-scope',
      //   content: 'profile email'
      // },
      // {
      //   name: 'google-signin-client_id',
      //   content: process.env.GOOGLE_CLIENT_ID
      // }
    ],
  },

  env: {
    MAP_URL: process.env.MAP_URL,
    GOOGLE_ANAL: process.env.GOOGLE_ANAL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NODE_ENV: process.env.NODE_ENV,
    IS_PROD: process.env.IS_PROD,
    ELASTIC_END_POINT: process.env.ELASTIC_END_POINT,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/gtag.js', mode: 'client' }
    { src: '~/plugins/jsonLd.ts', mode: 'client' },
    { src: '~/plugins/gtag.ts', mode: 'client' },
  ],
  components: true,

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: true,
    markdown: {
      remarkExternalLinks: {
        content: {
          type: 'element',
          tagName: 'svg',
          properties: {
            className: ['w-4', 'h-4', 'ml-1', '-mt-1', 'stroke-2'],
            style: [
              'stroke-linecap: round;',
              'stroke-linejoin: round; width: 1rem; display: block; margin: auto;',
            ],
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor',
          },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
              },
            },
          ],
        },
        contentProperties: {
          className: [
            'inline-block',
            'align-middle',
            'text-gray-600',
            'dark:text-gray-400',
          ],
        },
      },
    },
  },
  serverMiddleware: [{ path: '/api', handler: '~/server-middleware/index.ts' }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['nuxt-animejs'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BE_URL || 'http://localhost:3000/', // `${process.env.BASE_URL}:3001/`,
    headers: {
      'Access-Control-Allow-Origin': [process.env.BE_URL],
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Sitemap
  sitemap: {
    hostname: 'https://djandnicktalkaboutstuff.com/',
    routes() {
      return getRoutes()
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: './vuetify.options.js',
  },
  target: 'static',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vuetify/],
  },
}
