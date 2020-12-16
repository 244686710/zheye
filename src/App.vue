<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <ColumnList :list="list" /> -->
    <form>
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址" ></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Password</label>
          <validate-input :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
          ></validate-input>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'Yuyd'
}

// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这里是TEST1专栏'
//   },
//   {
//     id: 2,
//     title: 'test2的专栏',
//     description: '这里是TEST1专栏',
//     avatar: 'https://user-gold-cdn.xitu.io/2017/12/22/1607d2bb387d545d?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
//   },
//   {
//     id: 3,
//     title: 'test2的专栏',
//     description: '这里是TEST1专栏',
//     avatar: 'https://user-gold-cdn.xitu.io/2017/12/22/1607d2bb387d545d?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
//   },
//   {
//     id: 4,
//     title: 'test2的专栏',
//     description: '这里是TEST1专栏',
//     avatar: 'https://user-gold-cdn.xitu.io/2017/12/22/1607d2bb387d545d?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
//   }
// ]
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup () {
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不可以为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不可以为空' }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = '不可以为空'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = '请输入正确的邮箱'
      } else {
        emailRef.error = false
        emailRef.message = ''
      }
    }
    return {
      // list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal
    }
  }
})
</script>

<style>

</style>
