import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface ResponseType<T = {}> {
  code: number;
  msg: string;
  data: T;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt?: string;
  column: string;
  author: string;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  id?: number;
  column?: number;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps{
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  token: string;
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {

    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      debugger
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchCurrentUser (state, rowData) {
      state.user = { isLogin: true, ...rowData.data }
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      // 删除 ajax 头部设置的Authorization
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }

  },
  getters: {

    getColumnById: (state) => (id: string) => {
      console.log(id)
      return state.columns.find(c => c._id === id) || {}
    },
    getPostsByCid: (state) => (cid: string) => {
      console.log(cid)
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
