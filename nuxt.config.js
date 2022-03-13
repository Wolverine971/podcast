import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'content-language', content: 'en' },
    ],

  },

  env: {
    MAP_URL: process.env.MAP_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss',],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: true,
  },
  serverMiddleware: [{ path: "/api", handler: "~/server-middleware/password.ts" },],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['nuxt-animejs'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/vuetify'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BE_URL || 'http://localhost:3000/', // `${process.env.BASE_URL}:3001/`,
    headers: {
      'Access-Control-Allow-Origin': [
        process.env.BE_URL
      ]
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: "Halvetica"
      },
      color: '#37434c'
    },
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
