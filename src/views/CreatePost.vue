<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      action="/upload"
      class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
    >
    <h2>点击上传头像</h2>
    <template #loading>
      <div class="d-flex">
        <div class="spinner-boder text-secondary">
          <span class="sr-only">Loading...</span>
        </div>
        <h2>正在上传</h2>
      </div>
    </template>
    <template #uploaded="slotProps">
      <img :src="slotProps.uploadedData.data.url">
    </template>

    </uploader>
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
import { PostProps, ResponseType, ImageProps } from '../store'
import axios from 'axios'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import Uploader from '../components/Uploader.vue'
import { beforUploadCheck } from '../helper'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'CreatePost',
  components: { ValidateForm, ValidateInput, Uploader },
  setup () {
    const titleVal = ref('')
    const contentVal = ref('')
    const store = useStore()
    let imageId = ''
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column: column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success')
            setTimeout(() => {
              router.push({ name: 'Column', params: { id: column } })
            }, 2000)
          })
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
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp: any) => {
          console.log(resp)
        })
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      debugger
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式！', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片只能小于1M', 'error')
      }
      return passed
    }
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    return {
      onFormSubmit,
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      handleFileChange,
      uploadCheck,
      handleFileUploaded
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container{
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
