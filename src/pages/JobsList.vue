<template>
  <div id="app">
    <!-- JD-TABLE REQUIRED - TEMPLATE -->
    <div>
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{
        enabled: true
       }"
        :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
        styleClass="vgt-table condensed"
      />

      <!-- JD-TABLE REQUIRED - EXCEL EXPORT -->
      <iframe id="excelExportArea" style="display:none"></iframe>
    </div>
    <div>
      <vc-calendar
        is-expanded
        :attributes='attributes'
      />
    </div>
  </div>
</template>
<script>
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import {VueGoodTable} from 'vue-good-table';

export default {
// add to component
  components: {
    VueGoodTable,
  },
  // JD-TABLE REQUIRED - OPTIONS/PROPS
  data() {
    const todos = [
      {
        description: 'Service finished',
        isComplete: false,
        dates: {weekdays: 6}, // Every Friday
        color: 'red',
      },
    ];
    return {
      tableOptions: {},
      eventFromApp: {name: null, data: null},
      eventFromAppTrigger: false,
      tableLoader: false,
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Car',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        // {id: 1, name: "John", age: 20, createdAt: '', score: 0.03343},
        // {id: 2, name: "Jane", age: 24, createdAt: '2011-10-31', score: 0.03343},
        // {id: 3, name: "Susan", age: 16, createdAt: '2011-10-30', score: 0.03343},
        // {id: 4, name: "Chris", age: 55, createdAt: '2011-10-11', score: 0.03343},
        // {id: 5, name: "Dan", age: 40, createdAt: '2011-10-21', score: 0.03343},
        // {id: 6, name: "John", age: 20, createdAt: '2011-10-31', score: 0.03343},
      ],
      incId: todos.length,
      todos,
    }
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : '',
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ];
    },
  }
}
</script>
