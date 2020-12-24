<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">者也专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
        <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
      </ul>
      <ul v-else  class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好${user.nickName}`">
            <dropdown-item><router-link class="dropdown-item" to="/create">新建文章</router-link></dropdown-item>
            <dropdown-item><router-link class="dropdown-item" :to="{
              name: 'Column',
              params: {id: user.column }
            }">我得专栏</router-link></dropdown-item>
            <dropdown-item disabled><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
            <dropdown-item><a class="dropdown-item" href="#" @click="logout">退出登录</a></dropdown-item>
          </dropdown>
        </li>
      </ul>
     </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps } from '../store'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: { Dropdown, DropdownItem },
  setup () {
    const store = useStore()
    const logout = () => {
      store.commit('logout')
    }
    return {
      logout
    }
  }
})
</script>

<style>

</style>
