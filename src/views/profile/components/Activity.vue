<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <span class="description"/>
      </div>

      <el-form
        ref="loginForm"
        :model="myCars"
        :rules="carRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >

        <div class="title-container">
          <h3 class="title">Add new car</h3>
        </div>

        <el-form-item>
          <el-input
            ref="vehicle_make"
            v-model="myCars.vehicle_make"
            placeholder="Vehicle Make *"
            name="vehicle_make"
            type="text"
            tabindex="1"
            autocomplete="on"
            required
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="vehicle_model"
            v-model="myCars.vehicle_model"
            placeholder="Vehicle Model"
            name="vehicle_model"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="vehicle_year"
            v-model="myCars.vehicle_year"
            placeholder="Vehicle Year"
            name="vehicle_year"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="vehicle_trim"
            v-model="myCars.vehicle_trim"
            placeholder="Vehicle Trim"
            name="vehicle_trim"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="vehicle_style"
            v-model="myCars.vehicle_style"
            placeholder="Vehicle Style"
            name="vehicle_style"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="next_service"
            v-model="myCars.next_service"
            placeholder="Next Service"
            name="next_service"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="milage"
            v-model="myCars.milage"
            placeholder="Mileage"
            name="milage"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            ref="chasis_number"
            v-model="myCars.chasis_number"
            placeholder="Chassis Number"
            name="chasis_number"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleReg"
        >Add
        </el-button>

      </el-form>

    </div>
    <div class="post">
      <div class="user-block">
      </div>
      <el-table v-loading="listLoading" :data="cars" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Make">
          <template slot-scope="{row}">
            <span>{{ row.vehicle_make }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="Model">
          <template slot-scope="scope">
            <span>{{ scope.row.vehicle_model }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="Year">
          <template slot-scope="scope">
            <span>{{ scope.row.vehicle_year }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="Trim">
          <template slot-scope="scope">
            <span>{{ scope.row.vehicle_trim }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="Style">
          <template slot-scope="scope">
            <span>{{ scope.row.vehicle_style }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="Mileage">
          <template slot-scope="scope">
            <span>{{ scope.row.milage }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="Next Service">
          <template slot-scope="scope">
            <span>{{ scope.row.next_service }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="Chassis Number">
          <template slot-scope="scope">
            <span>{{ scope.row.chasis_number }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="Added on">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="scope">
            <router-link :to="'/example/edit/'+scope.row.id">
              <el-button type="primary" size="small" icon="el-icon-edit" disabled>
                Edit
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

<!--      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCars" />-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '@/components/Pagination'

const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'

export default {
  components: { Pagination },
  data() {
    return {
      myCars: {
        vehicle_make: '',
        vehicle_model: '',
        vehicle_year: '',
        vehicle_trim: '',
        vehicle_style: '',
        next_service: '',
        milage: '',
        chasis_number: ''
      },
      carRules: {
        vehicle_make: [{ required: true, trigger: 'blur' }],
        vehicle_model: [{ required: true, trigger: 'blur' }]
      },
      cars: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      loading: false,
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix
    }
  },
  mounted() {
    this.getCars()
  },
  methods: {
    async handleReg() {
      this.loading = true
      await axios.post('api/data/add/car/', this.myCars)
        .then(() => {
          console.log('succ')
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          console.log('error submit!!')
          return false
        })
    },
    async getCars() {
      this.listLoading = true
      await axios.get('api/data/get/car/')
        .then((res) => {
          this.cars = res.data.cars
          this.total = res.data.cars.length
          this.listLoading = false
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
