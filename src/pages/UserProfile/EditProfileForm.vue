<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
<!--          <div class="col-md-5">-->
<!--            <fg-input type="text"-->
<!--                      label="Company"-->
<!--                      :disabled="true"-->
<!--                      placeholder="Paper dashboard"-->
<!--                      v-model="user.company">-->
<!--            </fg-input>-->
<!--          </div>-->
          <div class="col-md-6">

            <fg-input type="text"
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      v-model="user.msisdn">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      label="Email"
                      placeholder="Email"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.first_name">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.last_name">
            </fg-input>
          </div>
        </div>

<!--        <div class="row">-->
<!--          <div class="col-md-12">-->
<!--            <fg-input type="text"-->
<!--                      label="Address"-->
<!--                      placeholder="Home Address"-->
<!--                      v-model="user.address">-->
<!--            </fg-input>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="row">-->
<!--          <div class="col-md-4">-->
<!--            <fg-input type="text"-->
<!--                      label="City"-->
<!--                      placeholder="City"-->
<!--                      v-model="user.city">-->
<!--            </fg-input>-->
<!--          </div>-->
<!--          <div class="col-md-4">-->
<!--            <fg-input type="text"-->
<!--                      label="Country"-->
<!--                      placeholder="Country"-->
<!--                      v-model="user.country">-->
<!--            </fg-input>-->
<!--          </div>-->
<!--          <div class="col-md-4">-->
<!--            <fg-input type="number"-->
<!--                      label="Postal Code"-->
<!--                      placeholder="ZIP Code"-->
<!--                      v-model="user.postalCode">-->
<!--            </fg-input>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="row">-->
<!--          <div class="col-md-12">-->
<!--            <div class="form-group">-->
<!--              <label>About Me</label>-->
<!--              <textarea rows="5" class="form-control border-input"-->
<!--                        placeholder="Here can be your description"-->
<!--                        v-model="user.aboutMe">-->

<!--              </textarea>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        company: "Paper Dashboard",
        username: "michael23",
        email: "",
        firstName: "Chet",
        lastName: "Faker",
        address: "Melbourne, Australia",
        city: "Melbourne",
        postalCode: "",
        aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
      }
    };
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      let user = await axios.get('/api/auth/user')
        .then((res) => {
          this.user = res.data.user
        })
        .catch((err) => console.log(err))
    },
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style>
</style>
