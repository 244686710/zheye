import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'

interface LoadParams {
  currentPage: number;
  pageSize: number;
  [propName: string]: any;
}
const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams) => {
  const store = useStore()

  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    ...params,
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))
  console.log(total)
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    isLastPage,
    loadMorePage
  }
}

export default useLoadMore
