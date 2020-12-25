<template>
  <div class="home">
    <column-list :list="list" />

    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage" v-if="!isLastPage"
    >加载更多</button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { computed, defineComponent, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import useLoadMore from '../hooks/useLoadMore'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.columns.total)
    const list = computed(() => store.getters.getColumns)
    const currentPage = computed(() => store.state.columns.currentPage)
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
      pageSize: 3,
      currentPage: (
        currentPage.value ? currentPage.value + 1 : 2)
    })
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 3 })
    })
    return {
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>
