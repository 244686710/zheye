<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="test"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input :rules="contentRules"
          rows="10"
          v-model="contentVal" placeholder="请输入文章详情" tag="textarea"></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps } from '../store'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

export default defineComponent({
  name: 'CreatePost',
  components: { ValidateForm, ValidateInput },
  setup () {
    const titleVal = ref('')
    const contentVal = ref('')
    const store = useStore()
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime() + '',
            title: titleVal.value,
            content: contentVal.value,
            column: columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'Column', params: { id: columnId } })
        }
      }
    }
    const titleRules: RulesProp = [{
      type: 'required',
      message: '请输入文章标题'
    }]
    const contentRules: RulesProp = [{
      type: 'required',
      message: '请输入文章内容'
    }]
    return {
      onFormSubmit,
      titleVal,
      contentVal,
      titleRules,
      contentRules
    }
  }
})
</script>

<style>

</style>
