export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId
    console.log(coachId)
    console.log(state.requests)
    return state.requests.filter((req) => req.coachId === coachId)
  },
  hasRequests(state, getters) {
    console.log(getters.requests)
    console.log(getters.requests.length > 0)
    return getters.requests && getters.requests.length > 0
  }
}
