import Vue, { Component } from 'vue'
// import VueRouter from 'vue-router'

// declare module 'vue/types/vue' { Store }
// }

import { Store } from 'vuex'

import { AppState } from './store/index'

declare module '*.vue' {
const component: Component
  export default component
}

declare module 'vue/types/vue' {
  interface Vue {
    sockets: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    sockets?: any;
  }
}

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
declare module 'vuex' {
  export function useStore(key?: string): Store<AppState>
}
