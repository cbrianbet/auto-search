<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The content half -->
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">

          <!-- Demo content-->
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">Pitstop Auto!</h3>
                <p class="text-muted mb-4">Signup.</p>
                <form @submit.prevent="handleSignup">
                  <div class="form-group mb-3">
                    <input id="f_name" type="text" placeholder="first name" required="" autofocus=""
                           v-model="signupForm.first_name"
                           class="form-control rounded-pill border-0 shadow-sm px-4">
                  </div>
                  <div class="form-group mb-3">
                    <input id="l_name" type="text" placeholder="last name" required="" autofocus=""
                           v-model="signupForm.last_name"
                           class="form-control rounded-pill border-0 shadow-sm px-4">
                  </div>
                  <div class="form-group mb-3">
                    <input id="inputEmail" type="text" placeholder="username" required="" autofocus=""
                           v-model="signupForm.username"
                           class="form-control rounded-pill border-0 shadow-sm px-4">
                  </div>
                  <div class="form-group mb-3">
                    <input id="email" type="email" placeholder="email" required="" autofocus=""
                           v-model="signupForm.email"
                           class="form-control rounded-pill border-0 shadow-sm px-4">
                  </div>
                  <div class="form-group mb-3">
                    <input id="msisdn" type="tel" placeholder="phone number" required="" autofocus=""
                           v-model="signupForm.msisdn"
                           class="form-control rounded-pill border-0 shadow-sm px-4">
                  </div>
                  <div class="form-group mb-3">
                    <input id="inputPassword" type="password" placeholder="password" required=""
                           v-model="signupForm.password"
                           class="form-control rounded-pill border-0 shadow-sm px-4 text-primary">
                  </div>

                  <div class="form-group mb-3">
                    <label class="h6">Role</label><br/>
                    <template v-for="(item, index) in userListOptions">
                      <input type="radio" v-model="signupForm.role_id" v-bind:value="item.id">{{ item.role }}
                      <br/>

                    </template>

                  </div>
                  <div class="custom-control custom-checkbox mb-3">
                    <input id="customCheck1" type="checkbox" checked class="custom-control-input">
                  </div>
                  <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                    Sign up
                  </button>
                  <div class=" d-flex justify-content-between mt-4">
                    <a href="/#/login"
                       class="btn btn-danger btn-block text-uppercase text-white mb-2 rounded-pill shadow-sm">
                      Sign in
                    </a></div>
                </form>
              </div>
            </div>
          </div><!-- End -->

        </div>
      </div><!-- End -->

      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
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
      signupForm: {
        username: '',
        password: '',
        role_id: null,
        email: '',
        msisdn: '',
        first_name: '',
        last_name: ''
      },
      loading: false,
      showDialog: false,
      redirect: undefined,
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
    this.getRemoteUserList()
  },
  methods: {
    async getRemoteUserList() {
      await axios.get('/api/data/roles').then(response => {
        if (!response.data) return
        this.userListOptions = response.data.roles
        console.log(this.userListOptions)
      })
    },
    handleSignup() {
      this.loading = true
      axios.post('/api/auth/register', this.signupForm)
        .then(() => {
          this.$router.push({path: '/login'})

          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })

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
