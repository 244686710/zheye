<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>

    <loader v-if="isLoading" text="拼命加载中"></loader>
    <router-view></router-view>
    <footer class="text-white text-center bg-secondary p-3">
      copyright2020
    </footer>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loader from './components/Loader.vue'
import createMessage from './components/createMessage'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },

  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
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
