// import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'content-language', content: 'en' }
      // {
      //   name: 'google-signin-scope',
      //   content: 'profile email'
      // },
      // {
      //   name: 'google-signin-client_id',
      //   content: process.env.GOOGLE_CLIENT_ID
      // }
    ],
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANAL}`,
        async: true
      },
      {
        async: true,
        defer: true,
        charset: 'utf-8',
        type: 'text/javascript',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${process.env.GOOGLE_ANAL});
        `
      }
    ]

  },

  env: {
    MAP_URL: process.env.MAP_URL,
    GOOGLE_ANAL: process.env.GOOGLE_ANAL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/gtag.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: true
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
    '@nuxtjs/toast'
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
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: './vuetify.options.js'
  },
  target: 'server',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vuetify/]
  }
}
