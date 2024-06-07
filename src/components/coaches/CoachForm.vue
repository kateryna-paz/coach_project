<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        @blur="clearValidity('firstName')"
        v-model.trim="firstName.value"
      />
      <p v-if="!firstName.isValid">First Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lasr Name</label>
      <input
        type="text"
        id="lastname"
        @blur="clearValidity('lastName')"
        v-model.trim="lastName.value"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        @blur="clearValidity('description')"
        v-model.trim="description.value"
      />
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Rate per Hour</label>
      <input type="number" id="rate" @blur="clearValidity('rate')" v-model.number="rate.value" />
      <p v-if="!rate.isValid">Rate must be greater then 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            @blur="clearValidity('areas')"
            v-model="areas.value"
          />
          <label for="frontend">Frontend developer</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="backend"
            value="backend"
            @blur="clearValidity('areas')"
            v-model="areas.value"
          />
          <label for="backend">Backend developer</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="career"
            value="career"
            @blur="clearValidity('areas')"
            v-model="areas.value"
          />
          <label for="career">Career Advisory</label>
        </div>
      </div>
      <p v-if="!areas.isValid">At least 1 expertise must be selected</p>
    </div>
    <div>
      <p v-if="!formIsValid">Please fix the above errors and try again!</p>
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        value: '',
        isValid: true
      },
      lastName: {
        value: '',
        isValid: true
      },
      rate: {
        value: null,
        isValid: true
      },
      description: {
        value: '',
        isValid: true
      },
      areas: {
        value: [],
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true
    },
    validateForm() {
      this.formIsValid = true
      if (this.firstName.value === '') {
        this.formIsValid = false
        this.firstName.isValid = false
      }
      if (this.lastName.value === '') {
        this.formIsValid = false
        this.lastName.isValid = false
      }
      if (this.description.value === '') {
        this.formIsValid = false
        this.description.isValid = false
      }
      if (this.rate.value === null || this.rate.value < 1) {
        this.formIsValid = false
        this.rate.isValid = false
      }
      if (this.areas.value.length === 0) {
        this.formIsValid = false
        this.areas.isValid = false
      }
    },
    submitForm() {
      this.validateForm()

      if (!this.formIsValid) {
        return
      }
      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value
      }
      this.$emit('save-data', formData)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

p {
  font-style: italic;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid h3 {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
