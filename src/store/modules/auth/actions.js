let timer

async function authenticate(context, payload, url) {
  const response = await fetch(`${url}?key=AIzaSyBR6ne5QUQrII_NKOdA130ZjUOYB1joRCo`, {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    })
  })

  const responseData = await response.json()

  if (!response.ok) {
    console.log(responseData)
    const error = new Error(
      responseData.message || 'Failed to authenticate. Please check your data.'
    )
    throw error
  }

  const expiresIn = +responseData.expiresIn * 1000
  // const expiresIn = 5000
  const expirationDate = new Date().getTime() + expiresIn

  localStorage.setItem('token', responseData.idToken)
  localStorage.setItem('userId', responseData.localId)
  localStorage.setItem('tokenExpiration', expirationDate)

  timer = setTimeout(() => {
    context.dispatch('autoLogout')
  }, expiresIn)

  context.commit('setUser', {
    token: responseData.idToken,
    userId: responseData.localId,
    tokenExpiration: expirationDate
  })
}

export default {
  async login(context, payload) {
    await authenticate(
      context,
      payload,
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    )
  },
  async signup(context, payload) {
    await authenticate(
      context,
      payload,
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    )
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()
    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }
  },
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null
    })
  }
}
