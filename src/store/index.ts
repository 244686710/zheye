import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { arrToObj, objToArr } from '../helper'
import router from '@/router'
export interface ResponseType<T = {}> {
  code: number;
  msg: string;
  data: T;
}

interface ListPorps<P> {
  [id: string]: P;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt?: string;
  column: string;
  author: string | UserProps;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: number;
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
  columns: {
    data: ListPorps<ColumnProps>;
    currentPage: number;
    total: number;
  };
  posts: {
    data: ListPorps<PostProps>;
    loadedColumns: ListPorps<{total?: number; currentPage?: number}>;
  };
  token: string;
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit, payload?: any) => {
  const { data } = await axios.get(url, payload)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const aysncAndCommit = async (url: string, mutationName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'GET' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: {
      data: {}, currentPage: 0, total: 0
    },
    posts: {
      data: {},
      loadedColumns: {

      }
    },
    user: { isLogin: false }
  },
  mutations: {

    createPost (state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns (state, rawData) {
      const { data: stateData } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: {
          ...stateData, ...arrToObj(list)
        },
        total: count,
        currentPage: currentPage * 1
      }
    },
    fetchColumn (state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      state.posts.data = {
        ...state.posts.data,
        ...arrToObj(rawData.data.list)
      }
      state.posts.loadedColumns[columnId] = {
        currentPage: rawData.data.currentPage,
        total: rawData.data.count
      }
    },
    fetchPost (state, { data }) {
      state.posts.data[data._id] = data
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
      state.user = { isLogin: false }
      router.push('/')
    },

    deletePost (state, { data }) {
      delete state.posts.data[data._id]
    },
    updatePost (state, { data }) {
      state.posts.data[data._id] = data
    }
  },
  actions: {
    fetchColumns ({ commit, state }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params

      if (currentPage > state.columns.currentPage) {
        return aysncAndCommit('/columns', 'fetchColumns', commit, {
          method: 'get',
          params: { currentPage, pageSize }
        })
      }
    },
    fetchColumn ({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts ({ state, commit }, params) {
      const { pageSize, currentPage, currentId } = params
      if (!state.posts.loadedColumns[currentId] ||
        (state.posts.loadedColumns[currentId] && state.posts.loadedColumns[currentId].currentPage as number < currentPage)) {
        return aysncAndCommit(`/columns/${currentId}/posts`, 'fetchPosts', commit, { method: 'get', params: { pageSize, currentPage } }, currentId)
      }
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
    },
    fetchPost ({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return aysncAndCommit(`/posts/${id}`, 'fetchPost', commit, { method: 'get' })
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    deletePost ({ commit }, id) {
      return aysncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    },
    updatePost ({ commit }, { id, payload }) {
      return aysncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    }

  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id] || {}
    },
    getPostsByCid: (state) => (cid: string) => {
      console.log(cid)
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  }
})

export default store
