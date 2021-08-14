<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>


      <!-- The content half -->
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">

          <!-- Demo content-->
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">Pitstop Auto!</h3>
                <p class="text-muted mb-4">login to get started.</p>
                <form @submit.prevent="handleLogin">
                  <div class="form-group mb-3">
                    <input id="inputEmail" type="text" placeholder="username" required="" autofocus="" v-model="loginForm.username"
                           class="form-control rounded-pill border-0 shadow-sm px-4">
                  </div>
                  <div class="form-group mb-3">
                    <input id="inputPassword" type="password" placeholder="Password" required="" v-model="loginForm.password"
                           class="form-control rounded-pill border-0 shadow-sm px-4 text-primary">
                  </div>
                  <div class="custom-control custom-checkbox mb-3">
                    <input id="customCheck1" type="checkbox" checked class="custom-control-input">
                    <label for="customCheck1" class="custom-control-label">Remember password</label>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                    Sign in
                  </button>
                  <div class=" d-flex justify-content-between mt-4"><a href="/#/signup" class="btn btn-danger btn-block text-uppercase text-white mb-2 rounded-pill shadow-sm">
                    Sign up
                  </a></div>
                </form>
              </div>
            </div>
          </div><!-- End -->

        </div>
      </div><!-- End -->

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    const validateUsername = async (rule, value, callback) => {
      await axios.post('/api/data/valid/username/', {username: value})
        .then((res) => {
          console.log(res.data)
          if (!res.data) {
            callback(new Error('Username taken. Please enter another user name'))
          } else {
            callback()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      userListOptions: []
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$store.dispatch('login', this.loginForm)
        .then(() => this.$router.push('/'))
        .catch(err => alert(err))
    }
  }
}
</script>
<style>
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('https://images.unsplash.com/photo-1611330791715-a3b110dc6215?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80');
  background-size: cover;
  background-position: center center;
}
</style>
