import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export interface AppState {
  authenticated: boolean
}
// STATE
export const state: AppState = {
  authenticated: false,
}

export const getters = {
  authenticated(state: AppState) {
    return state.authenticated
  },
}

// MUTATIONS
export const mutations = {
  setAuthenticated(state: AppState, val: boolean) {
    state.authenticated = val
  },
}

// ACTIONS
export const actions: any = {

  toastSuccess ({ commit }: any, text: string) {
    if (commit) {
      this.$toast.success(text, {
        theme: 'toasted-primary',
        position: 'top-right',
        duration: 3000
      })
    }
  },
  toastError ({ commit }: any, text: string, duration: number = 3000) {
    if (commit) {
      this.$toast.error(text, {
        theme: 'toasted-primary',
        position: 'top-right',
        duration
      })
    }
  },
}

const createStore = () =>
  new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
  })

export default createStore
