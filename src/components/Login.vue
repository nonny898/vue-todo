<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col lg="3" md="8" xs="12">
        <b-form @keydown.enter="login">
          <h1>Login</h1>
          <p class="text-muted">Sign In</p>
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
          <b-row style="margin-top: 10px">
            <b-col md="6">
              <b-button block variant="primary" @click="login">Login</b-button>
            </b-col>
            <b-col md="6">
              <b-button block variant="success" to="/register">Register</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        alert: "",
      }
    },
    methods: {
      async login() {
        try {
          // eslint-disable-next-line no-unused-vars
          const resp = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          await this.$router.push('/')
        } catch (error) {
          this.alert = error.message;
        }
      }
    }
  }
</script>
<style scoped>

</style>