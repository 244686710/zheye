<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
     <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage" v-if="!isLastPage"
    >加载更多</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'
import useLoadMore from '../hooks/useLoadMore'
export default defineComponent({
  components: { PostList },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', { currentId, pageSize: 2, currentPage: 1 })
    })
    if (currentId) {

    }
    const total = computed(() => (store.state.posts.loadedColumns[currentId as string] && store.state.posts.loadedColumns[currentId as string].total) || 0)
    const currentPage = computed(() => store.state.posts.loadedColumns[currentId as string] && store.state.posts.loadedColumns[currentId as string].currentPage)

    const { isLastPage, loadMorePage } = useLoadMore('fetchPosts', total, {
      currentId,
      pageSize: 2,
      currentPage: currentPage.value ? currentPage.value + 1 : 2
    })
    // console.log(isLastPage, loadMorePage)
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      column,
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>

<style>

</style>
