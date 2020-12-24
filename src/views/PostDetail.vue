<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src=" currentPost.image && currentPost.image.url" alt="">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3">
        <div class="col">

        </div>
        <span class="text-muted col text-right font-italic">发布于： {{currentPost.updatedAt}}</span>
      </div>
      <div v-html="currentPost.content"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          :to="{name: 'Create', query: {id: currentPost._id}}"
          type="button" class="btn btn-success">编辑</router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>

    <modal
      :visible="modalIsVisible"
      title="删除文章"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
      >
      <p>确认删除文章吗？</p>
    </modal>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { GlobalDataProps, PostProps, UserProps, ResponseType } from '../store'
import createMessage from '../components/createMessage'
import Modal from '../components/Modal.vue'
import router from '@/router'
export default defineComponent({
  components: { Modal },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    const modalIsVisible = ref(false)
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuther = currentPost.value.author as UserProps
        return postAuther._id === _id
      } else {
        return false
      }
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
        setTimeout(() => {
          router.push({
            name: 'Column',
            params: { id: rawData.data.column }
          })
        }, 2000)
        console.log(rawData)
      })
    }
    return {
      currentPost,
      currentHTML,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>
<style scoped>
.post-detail-page img {
  width: 100%;
}
</style>
