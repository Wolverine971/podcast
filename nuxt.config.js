import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - podcast',
    title: 'podcast',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'DJ and Nick talk about stuff on a podcast',
      },
      { 'http-equiv': 'content-language', content: 'en' },
      { property: 'og:url', content: 'https://djandnicktalkaboutstuff.com' },
      {
        property: 'og:description',
        content: 'DJ and Nick talk about stuff on a podcast',
      },
      { property: 'og:title', content: 'dj and nick podcast' },
      {
        name: 'twitter:description',
        content: 'DJ and Nick talk about stuff on a podcast',
      },
      {
        name: 'twitter:title',
        content: 'DJ and Nick talk about stuff on a podcast',
      },
      {
        name: 'keywords',
        content: 'DJ, Nick, talk, podcast',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/account-multiple.png' },
    ],
  },

  env: {
    MAP_URL: process.env.MAP_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: true,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/vuetify',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      treeShake: true,
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
