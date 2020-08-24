import Vue from 'vue'

export const state = () => ({
  events: [],
})

export const mutations = {
  add(state, values) {
    if (state.events.length === 50) {
      state.events.pop()
    }
    state.events.splice(0, 0, values)
  },
  update(state, { key, result, time, type }) {
    Vue.set(state, key, result)
    Vue.set(state, 'time', time)
    Vue.set(state, 'type', type)
  },
}
