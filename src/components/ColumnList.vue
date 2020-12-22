<template>
  <div class="row">
    <div class="col-4 mt-2" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow text-center">
        <div class="card-body">
          <img  class="border-light rounded-circle my-3" :src="column.avatar && column.avatar.url" :alt="column.title">

          <h5 class="card-title">{{column.title}}</h5>
          <div class="card-text text-left mb-2">{{column.description}}</div>
          <router-link :to="{name: 'Column', params: {id: column._id}}" class="btn btn-outline-primary">進入專欄</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '../store'

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
          column.avatar = {
            url: require('@/assets/logo.png')
          }
        }
        return column
      })
    })
    return {
      columnList
    }
  }

})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
