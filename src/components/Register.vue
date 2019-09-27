<template>
  <div>
    <b-form @keydown.enter="signup">
      <h1>Sign Up for new user</h1>
      <p class="text-muted">Sign Up</p>
      <b-alert variant="danger" :show="alert!== ''">{{ alert }}</b-alert>
      <b-form-input type="text"
                    class="form-control"
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="email">
      </b-form-input>
      <b-form-input type="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="current-password"
                    v-model="password">
      </b-form-input>
      <b-button variant="primary" @click="signup">Sign Up</b-button>
      <b-button to="/login">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: "Register",
    data() {
      return {
        email: "",
        password: "",
        alert: "",
      }
    },
    methods: {
      async signup() {
        try {
          // eslint-disable-next-line no-unused-vars
          const resp = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          await this.$router.push('/login')
        } catch (error) {
          this.alert = error.message;
        }
      }
    }
  }
</script>