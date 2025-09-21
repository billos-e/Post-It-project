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

        if(this.posts.length == 0) this.message = 'Pas de notes jusque là'

      } catch (err) {
        if(err.response) {
          this.message = err.response.data.error.message
        } else this.message = 'Erreur de connexion, verifiez le reseau'

        console.log('Error: ' + this.message);
      }

    },
    async addPost(payload) {
      try {
        this.message = ''
        await axios.post(url, payload)
        this.getAllPosts()
        console.log('Ajout nouveau post');
      }catch (err) {
        alert("Erreur lors de l'ajout")
        console.log("Adding error:" + err);

        if(err.response) {
          this.message = err.response.data.error.message
        } else this.message = 'Erreur de connexion, verifiez le reseau'

        console.log('Error: ' + this.message);

      }
    },
    async getPost(id) {

      try {
        this.message = ''
        const respo = await axios.get(url + id)
        this.selectedPost = respo.data;
        console.log('Chargement post: ' + id);


      } catch (err) {

        if(err.response) {
          this.message = err.response.data.error.message
        } else this.message = 'Erreur de connexion, verifiez le reseau'

        console.log('Error: ' + this.message);
      }
    },
    async deletePost(id) {
      try{
        this.message = ''
        await axios.delete(url + id)
        console.log('Suppression post: ' + id);
        alert(`Post : ${id} supprimé avec succès`)
        this.getAllPosts()
      }catch(err){
        if(err.response) {
          this.message = err.response.data.error.message
        } else this.message = 'Erreur de connexion, verifiez le reseau'

        console.log('Error: ' + this.message);
      }
    },
    async updatePost(id, updated) {
      try{
        this.message = ''
        await axios.put(url + id, updated)
        console.log('Modification post: ' + id);
        this.getPost(id)
      }catch(err){
        if(err.response) {
          this.message = err.response.data.error.message
        } else this.message = 'Erreur de connexion, verifiez le reseau'

        console.log('Error: ' + this.message);
        alert('Error: ' + this.message)
      }
    },
  },
})
