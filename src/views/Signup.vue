<template>
  <div class="signup-paeg mx-auto p-3 w-300">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label for="" class="form-label">昵称</label>
        <validate-input :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" />
      </div>
      <div class="mb-3">
        <label for="" class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          type="password"
          v-model="formData.password"
          placeholder="请输入密码" />
      </div>
      <div class="mb-3">
        <label for="" class="form-label">密码</label>
        <validate-input
          :rules="repeatPasswordRules"
          type="password"
          v-model="formData.repeatPassword"
          placeholder="请输入密码" />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Signup',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const emailRules: RulesProp = [
      { type: 'email', message: '请输入正确的邮箱' },
      { type: 'required', message: '请输入邮箱' }
    ]
    const nameRules: RulesProp = [
      { type: 'required', message: '请输入昵称' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]

    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        }
        axios.post('/users', payload).then(() => {
          createMessage('注册成功 正在跳转登录页面', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      onFormSubmit,
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules
    }
  }
})
</script>
<style lang="" scoped>

</style>
