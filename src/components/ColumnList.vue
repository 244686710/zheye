<template>
  <div class="row">
    <div class="col-4 mt-2" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow text-center">
        <div class="card-body">
          <img  class="border-light rounded-circle my-3 w-25" :src="column.avatar" :alt="column.title">

          <h5 class="card-title">{{column.title}}</h5>
          <div class="card-text text-left mb-2">{{column.description}}</div>
          <a href="#" class="btn btn-outline-primary">進入專欄</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
export interface ColumnProps{
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/logo.png')
        }
        return column
      })
    })
    return {
      columnList
    }
    // return {
    //   list: props.list
    // }
  }

})
</script>

<style>

</style>
