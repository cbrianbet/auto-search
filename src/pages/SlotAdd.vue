<template>
  <div>
    <b-card class="mt-3">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Client*:"
          label-for="input-1"
        >
          <b-form-select v-model="form.client"
                         :options="clientsList"
                         @change="clientCars($event)"
                         text-field="name" value-field="uuid"
                         required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Car*:" label-for="input-2">
          <b-form-select v-model="form.car" :options="cars" text-field="name" value-field="uuid" v-bind:disabled="true"
                         required></b-form-select>
        </b-form-group>
        <div class="row">
          <div v-for="(a, k) in form.services">
            <div class="col-xl-12">
              <label>Service {{ k + 1 }}</label>
              <b-form-group id="input-group-2" label="Service*:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="a.service"
                  placeholder="Service"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="Service Period(Days)*:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="a.period"
                  type="number"
                  placeholder="Service Period(Days)"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-button type="button" variant="secondary" @click="removeService(k)"
                      v-show="k || ( !k && form.services.length > 1)">Remove Service
            </b-button>
            <b-button type="button" variant="primary" @click="addService()" v-show="k == form.services.length-1">Add
              Service
            </b-button>
          </div>
        </div>
        <br>
        <!--        <b-form-group id="input-group-2" label="Unit Price*:" label-for="input-2">-->
        <!--          <b-form-input-->
        <!--            id="input-2"-->
        <!--            v-model="form.unit_price"-->
        <!--            placeholder="Unit Price"-->
        <!--          ></b-form-input>-->
        <!--        </b-form-group>-->

        <!--      <b-form-group id="input-group-3" label="Food:" label-for="input-3">-->
        <!--        <b-form-select-->
        <!--          id="input-3"-->
        <!--          v-model="form.food"-->
        <!--          :options="foods"-->
        <!--          required-->
        <!--        ></b-form-select>-->
        <!--      </b-form-group>-->
        <!--{{form}}-->

        <b-button type="submit" variant="success">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Slots Add",
  data() {
    return {
      clientsList: [],
      cars: [],
      form: {
        client: null,
        car: '',
        services: [{
          service: null,
          period: null,
          cost: null
        }]
      },
      foods: [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  created() {
    this.clients()
  },
  methods: {
    async clients() {
      await axios.get('/api/data/clients/list')
        .then((res) => {
          this.clientsList = res.data.clients
          console.log(res)
        })
        .catch((err) => {
          alert(err)
        })
    },
    async clientCars(event) {
      console.log(event)
      await axios.post('/api/data/client/cars',{})
        .then((res) => {
          this.clientsList = res.data.clients
          console.log(res)
        })
        .catch((err) => {
          // alert(err)
        })
    },
    addService() {
      this.form.services.push({
        service: null,
        period: null,
        cost: null
      })
    },
    removeService(index) {
      this.form.services.splice(index, 1)
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.type = null
      this.form.unit_price = null
      this.form.quantity = null
      this.form.supplier = null
      this.form.name = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
