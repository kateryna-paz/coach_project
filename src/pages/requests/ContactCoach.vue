<template>
  <div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <form v-else @submit.prevent="sendMessage">
      <div>
        <label for="email">Your E-Mmail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea name="message" id="message" rows="6" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">Please enter a valid email and non-empty message!</p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      email: '',
      message: '',
      isLoading: false,
      error: null
    }
  },
  methods: {
    async sendMessage() {
      this.formIsValid = true
      if (this.email === '' || !this.email.includes('@') || this.message === '') {
        this.formIsValid = false
        return
      }

      this.isLoading = true
      try {
        await this.$store.dispatch('requests/contactCoach', {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id
        })
      } catch (error) {
        this.error = error.messsage || 'Something went wrong!'
      }

      this.isLoading = false

      this.$router.replace('/coaches')
    },
    handleError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  margin-bottom: 0.5rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
