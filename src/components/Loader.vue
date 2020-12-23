<template>
<teleport to="#loader">
  <div class="d-flex justify-content-center align-items-center h-100 loading-container"
    :style="{backgroundColor: background || ''}"
  >
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{text || 'loading...'}}</span>
      </div>
      <p v-if="text" class="text-primary small">{{text}}</p>
    </div>
  </div>
</teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    useDOMCreate('loader')
  }
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, .5);
}
.loading-content {
  text-align: center;
}
</style>
