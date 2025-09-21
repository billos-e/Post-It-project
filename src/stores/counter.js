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

// ajout gestion erreur

const url = 'https://post-it.epi-bluelock.bj/notes/'

export const usePosts = defineStore('postIts', {
  state: () => ({
    posts: [],
    selectedPost: null,
    message : ''
  }),
  actions: {
    async getAllPosts() {
      try {

        this.message = ''
        const respo = await axios.get(url)
        this.posts = respo.data.notes
        console.log('Chargement tous les posts');

        if(this.posts == []) this.message = 'Pas de notes jusque là'
      } catch (err) {
        this.message = 'Erreur lors du chargement'
        console.log('Error:' + err);

      }

    },
    async addPost(payload) {
      await axios.post(url, payload)
      this.getAllPosts()
      console.log('Ajout nouveau post');
    },
    async getPost(id) {
      const respo = await axios.get(url + id)
      this.selectedPost = respo.data;
      console.log('Chargement post: ' + id);
    },
    async deletePost(id) {

      await axios.delete(url + id)
      // this.getAllPosts()
      console.log('Suppression post: ' + id);
    },
    async updatePost(id, updated) {
      await axios.put(url + id, updated)
      console.log('Modification post: ' + id);
      this.getPost(id)
    },
  },
})
