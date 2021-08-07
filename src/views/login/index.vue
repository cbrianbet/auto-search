<template>
  <div id="app">
    <div id="login">
      <div id="description">
        <h1>Login</h1>
        <p>Auto pitstop.</p>
      </div>
      <div id="form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
          @submit.prevent="handleLogin"
        >
          <label for="email">Email</label>
          <input
            id="email"
            ref="username"
            v-model="loginForm.username"
            type="text"
            placeholder="username"
            autocomplete="off"
          >

          <label for="password">Password</label>&nbsp;
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
          <input
            id="password"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="**********"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >

          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >Login
          </el-button>
        </el-form>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Sign up
        </el-button>
      </div>
      <el-dialog title="Or connect with" :visible.sync="showDialog">
        <div class="login-container">

          <el-dialog title="Sign up" :visible.sync="showDialog">
            <br>
            <el-form
              ref="signupForm"
              :model="signupForm"
              :rules="signupRules"
              class="signup-form"
              autocomplete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">Sign up</h3>
              </div>

              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="username"
                  v-model="signupForm.username"
                  placeholder="Username"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item prop="email">
                <span class="svg-container">
                  <svg-icon icon-class="email" />
                </span>
                <el-input
                  ref="email"
                  v-model="signupForm.email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item prop="first_name">
                <span class="svg-container">
                  <i class="el-icon-tickets" />
                </span>
                <el-input
                  ref="first_name"
                  v-model="signupForm.first_name"
                  placeholder="First Name"
                  name="first_name"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item prop="last_name">
                <span class="svg-container">
                  <i class="el-icon-document-copy" />
                </span>
                <el-input
                  ref="last_name"
                  v-model="signupForm.last_name"
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item prop="msisdn">
                <span class="svg-container">
                  <i class="el-icon-phone" />
                </span>
                <el-input
                  ref="msisdn"
                  v-model="signupForm.msisdn"
                  placeholder="Phone Number"
                  name="msisdn"
                  type="tel"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item class="">
                <el-select
                  v-model="signupForm.role_id"
                  :remote-method="getRemoteUserList"
                  filterable
                  default-first-option
                  remote
                  placeholder="Role"
                >
                  <el-option
                    v-for="(item,index) in userListOptions"
                    :key="item+index"
                    :label="item.role"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="signupForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleSignup"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>
              </el-tooltip>

              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleSignup"
              >Sign up
              </el-button>

              <div style="position:relative">
                <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
                  Login
                </el-button>
              </div>
            </el-form>
            <br>
            <br>
          </el-dialog>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    const validateUsername = async(rule, value, callback) => {
      // const valid_map = ['admin', 'editor']
      await axios.post('http://localhost:5000/api/data/valid/username/', { username: value })
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
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      signupForm: {
        username: '',
        password: '',
        role_id: null,
        email: '',
        msisdn: '',
        first_name: '',
        last_name: ''
      },
      signupRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      userListOptions: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
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
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.getRemoteUserList()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    async getRemoteUserList() {
      await axios.get('http://localhost:5000/api/data/roles').then(response => {
        if (!response.data) return
        this.userListOptions = response.data.roles
        console.log(this.userListOptions)
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    async showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              console.log('succ')
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleSignup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          this.loading = true
          axios.post('http://localhost:5000/api/auth/register', this.signupForm)
            .then(() => {
              this.$router.push({ path: '/login' })
              this.showDialog = false
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        } else {
          console.log('error signup!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  align-items: center;
  background-color: #db6722;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form el-button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form el-button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

}
</style>
