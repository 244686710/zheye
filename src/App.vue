<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <h1>{{error.message}}</h1>
    <loader v-if="isLoading" text="拼命加载中"></loader>

    <router-view></router-view>
    <footer class="text-white text-center bg-secondary p-3">
      copyright2020
    </footer>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loader from './components/Loader.vue'
import axios from 'axios'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader, Loader
  },

  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
      // 判断时候登录，和 token
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })

    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style>

</style>
