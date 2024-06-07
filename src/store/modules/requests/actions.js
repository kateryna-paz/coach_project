export default {
  async contactCoach(context, data) {
    const newRequest = {
      userEmail: data.email,
      message: data.message
    }

    const response = await fetch(
      `https://vue-demo-1-1ea82-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request!')
      throw error
    }

    newRequest.id = responseData.name
    newRequest.coachId = data.coachId
    console.log(newRequest)

    context.commit('addRequest', newRequest)
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token
    const response = await fetch(
      `https://vue-demo-1-1ea82-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests!')
      throw error
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    console.log(requests)

    context.commit('setRequests', requests)
  }
}
