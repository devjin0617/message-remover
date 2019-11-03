const state = {
  token: ''
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  }
}

const actions = {
  setToken ({ commit }, payload) {
    commit('SET_TOKEN', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
