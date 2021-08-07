<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import clientDashboard from './client'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, clientDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    console.log(this.roles)
    if (this.roles.includes('Client')) {
      this.currentRole = 'clientDashboard'
    } else if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
