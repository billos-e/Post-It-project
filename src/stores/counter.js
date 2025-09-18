import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const usePosts = defineStore('postIts', {
  state: () => ({
    posts: [],
    selectedPost: null,
  }),
  actions: {
    async getAllPosts() {
      const respo = await axios.get('https://post-it.epi-bluelock.bj/notes')
      this.posts = respo.data.notes
    },
    async addPost(payload) {
      await axios.post('https://post-it.epi-bluelock.bj/notes', payload)
      this.getAllPosts()
    },
    async getPost(id) {
      const respo = await axios.get(`https://post-it.epi-bluelock.bj/notes/${id}`)
      this.selectedPost = respo.data
    },
    async deletePost(id) {
      await axios.delete(`https://post-it.epi-bluelock.bj/notes/${id}`)
      this.getAllPosts()
    },
    async updatePost(id, updated) {
      await axios.put(`https://post-it.epi-bluelock.bj/notes/${id}`, updated)
      this.getAllPosts()
    },
  },
})
