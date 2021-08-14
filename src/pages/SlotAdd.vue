<template>
  <div>
    <b-card class="mt-3">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Client*:"
          label-for="input-1"
        >
          <b-form-select v-model="selected" :options="options" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Car*:" label-for="input-2">
          <b-form-select v-model="selected" :options="options" v-bind:disabled="true" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Service*:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.quantity"
            placeholder="Services"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Service Period*:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.supplier"
            placeholder="Service Period"
          ></b-form-input>
          <b-button type="button" variant="dark">Add Service</b-button>
        </b-form-group>

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


        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Inventory Add",
  data() {
    return {
      form: {
        type: null,
        name: '',
        unit_price: null,
        quantity: null,
        supplier: null
      },
      foods: [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  methods: {
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
      // this.form.food = null
      // this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
