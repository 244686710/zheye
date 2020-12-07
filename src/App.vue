<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <ColumnList :list="list" />

  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'Yuyd'
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这里是TEST1专栏'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这里是TEST1专栏',
    avatar: 'https://user-gold-cdn.xitu.io/2017/12/22/1607d2bb387d545d?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  },
  {
    id: 3,
    title: 'test2的专栏',
    description: '这里是TEST1专栏',
    avatar: 'https://user-gold-cdn.xitu.io/2017/12/22/1607d2bb387d545d?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  },
  {
    id: 4,
    title: 'test2的专栏',
    description: '这里是TEST1专栏',
    avatar: 'https://user-gold-cdn.xitu.io/2017/12/22/1607d2bb387d545d?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      currentUser
    }
  }
})
</script>

<style>

</style>
