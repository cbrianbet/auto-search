<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <div class="el-row">
        <div class="el-col-md-12">
          <pan-thumb :image="avatar" style="float: left">
            Your role:
            <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
          </pan-thumb>
        </div>
        <div class="el-col-md-6">
          <!--      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />-->
          <div class="info-container">
            <span class="display_name">{{ name }}</span>
            <span style="font-size:20px;padding-top:20px;display:inline-flex;">{{ roles[0] }}'s Dashboard</span>
          </div>
        </div>
      </div>
      <el-form
        ref="loginForm"
        :model="Part"
        class="login-form"
        autocomplete="on"
        label-position="left">
        <div class="el-row">
          <div class="el-col-lg-8  control-section" style="height: auto">
            <div id="content" style="margin: 0 auto; width:250px; padding-top: 30px">
              <ejs-autocomplete
                id="sample-list"
                v-model="Part.car"
                :data-source="carsData"
                :change="modelChange"
                :filter-type="filterType"
                :highlight="true"
                :fields="fields"
                placeholder="MAKE e.g. BMW"
                required
              />
            </div>
          </div>
          <div class="el-col-lg-8  control-section" style="height: auto">
            <div id="model" style="margin: 0 auto; width:250px; padding-top: 30px">
              <ejs-autocomplete
                id="sample-list"
                v-model="Part.models"
                :change="yearChange"
                :data-source="modelsData"
                :filter-type="filterType"
                :highlight="true"
                :fields="fields"
                placeholder="MODEL e.g. X2"
              />
            </div>
          </div>
          <div class="el-col-lg-8  control-section" style="height: auto">
            <div id="year" style="margin: 0 auto; width:250px; padding-top: 30px">
              <ejs-autocomplete
                id="sample-list"
                v-model="Part.year"
                :data-source="yearsData"
                :filter-type="filterType"
                :highlight="true"
                :fields="fields"
                placeholder="YEAR e.g. 2012"
              />
            </div>
          </div>
          <div class="el-col-lg-24  control-section text-center" style="height: auto">
            <span style="font-size:20px;padding:20px;display:inline-flex;">OR</span>
          </div>
          <div class="el-col-lg-24  control-section text-center" style="height: auto">

            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="part_number" name="name" required style="background-color : #d1d1d1;">
                Part Number
              </MDinput>
            </el-form-item>
          </div>
          <!--        <div class="el-col-lg-4 property-section">-->
          <!--          <table id="property" title="Properties" style="width: 100%;">-->
          <!--            <tr>-->
          <!--              <td style="width:50%">FilterType :</td>-->
          <!--              <td style="padding-top: 10px">-->
          <!--                <ejs-dropdownlist id="filter" :data-source="filterData" :change="onChange" :width="width" text="Contains" placeholder="Find a type" />-->
          <!--              </td>-->
          <!--            </tr>-->
          <!--          </table>-->
          <!--        </div>-->
        </div>

        <el-button v-loading="loading" type="warning" @click="searchParts">
          Search Parts
        </el-button>
      </el-form>
      <div>
        <img :src="emptyGif" class="emptyGif">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import { AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns'
import axios from 'axios'
import MDinput from '@/components/MDinput'
// import GithubCorner from '@/components/GithubCorner'
Vue.use(AutoCompletePlugin)

export default {
  name: 'DashboardEditor',
  components: { PanThumb, MDinput },
  data() {
    return {
      loading: false,
      Part: {
        car: '',
        models: '',
        year: ''
      },
      part_number: '',
      fields: { value: 'Name' },
      filterType: 'Contains',
      carsData: [],
      modelsData: [],
      yearsData: [],
      width: '150px',
      filterData: ['Contains', 'StartsWith', 'EndsWith'],
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  mounted() {
    this.getCars()
  },
  methods: {
    onChange: function(e) {
      this.filterType = e.itemData.value
    },
    getCars: async function() {
      await axios.get('http://localhost:5000/api/data/all/cars')
        .then((res) => {
          this.carsData = res.data.cars
        })
        .catch((err) => {
          console.log(err)
        })
    },
    modelChange: async function(e) {
      console.log(this.car)
      console.log(e)
      await axios.post('http://localhost:5000/api/data/car/models', { 'make': e.itemData.value })
        .then((res) => {
          this.modelsData = res.data.model
        })
        .catch((err) => {
          console.log(err)
        })
    },
    yearChange: async function(e) {
      console.log(e)
      await axios.post('http://localhost:5000/api/data/car/years', { 'model': e.itemData.value, 'make': this.Part.car })
        .then((res) => {
          this.yearsData = res.data.year
        })
        .catch((err) => {
          console.log(err)
        })
    },
    searchParts: async function() {
      if (this.part_number !== '') {
        await axios.post('http://localhost:5000/api/data/search', { 'model': this.part_number })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        await axios.post('http://localhost:5000/api/data/search', this.Part )
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";

.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;

  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }

  .info-container {
    position: relative;
    //height: 100%;
    line-height: 200px;
    margin-left: 50px;

    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}

input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }
</style>
