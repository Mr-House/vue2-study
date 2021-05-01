import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    getters: {
      doubleCounter: state => state.counter * 2
    },
    mutations: {
      add(state) {
        state.counter++
      },
      sub(state) {
        if (state.counter > 0) {
          state.counter--
        }
      }
    },
    actions: {
      add({ commit }) {
        commit('add')
      },
      sub({ commit }) {
        commit('sub')
      }
    }
  })
}
