<template>
  <div>
    <b-card class="mt-3">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Product Name*:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            placeholder="Product Name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Product Type*:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.type"
            placeholder="Product Type"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Quantity*:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.quantity"
            placeholder="Quantity"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Supplier:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.supplier"
            placeholder="Supplier"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Unit Price*:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.unit_price"
            placeholder="Unit Price"
          ></b-form-input>
        </b-form-group>

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
