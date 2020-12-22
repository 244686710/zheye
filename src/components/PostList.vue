<template>
<div class="post-list" >
  <article class="card mb-3 shadow" v-for="post in list" :key="post._id">
    <div class="card-body w-100">
      <h4>{{post.title}}</h4>
      <div class="row my-3 align-items-center">
        <div class="col-3">
          <img :src="post.image && post.image.url" alt="" class="w-100">
        </div>
        <p :class="{'col-9': post.image}">{{post.excerpt}}</p>
      </div>
      <span class="text-muted">{{post.createdAt}}</span>
    </div>
  </article>

</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../store'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }

})
</script>

<style scoped>
.media {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
}
.media img {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  border-radius: 5px;
}
.media-body .excerpt {
  float: left;
  line-height: 40px;
}
</style>
