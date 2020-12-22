<template>
      <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
          placeholder="请输入邮箱地址"
          v-model="emailVal"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Password</label>
          <validate-input :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
          ></validate-input>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-danger">Submit</button>
      </template>
    </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { ValidateInput, ValidateForm },
  setup () {
    const inputRef = ref()
    const emailVal = ref('')
    const router = useRouter()
    const store = useStore()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不可以为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不可以为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const data = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', data).then(data => {
          console.log(data)
          router.push('/')
        }).catch(e => {
          console.log(e)
        })
      }
    }

    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>

</style>
