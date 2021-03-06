import Vue from 'vue'

export const state = () => ({})

export const mutations = {
  initialize(state, values) {
    Object.keys(values).forEach((k) => {
      Vue.set(state, k, values[k])
    })
  },
  update(state, { key, result, time, type }) {
    Vue.set(state, key, result)
    Vue.set(state, 'time', time)
    Vue.set(state, 'type', type)
  },
}
