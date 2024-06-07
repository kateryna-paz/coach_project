<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach </router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/requests">Requests</router-link></li>
        <li v-else class="light"><router-link to="/auth">Log In</router-link></li>
        <li v-if="isLoggedIn">
          <base-button @click="logOut" mode="light">Log Out</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logout')
      this.$router.replace('/auth')
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #d2f391;
  border: 2px solid #3d008d;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 7px;
}

a:active,
a:hover,
a.router-link-active {
  border: 2px solid #d2f391;
  background-color: #360479;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.light a,
.light button {
  color: #effffa;
  border: 2px solid #ffffff;
}
</style>
