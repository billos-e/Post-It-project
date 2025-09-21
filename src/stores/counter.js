import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import axios from 'axios' Cas axios commentés

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

        // const respo = await axios.get(url)

        const inter = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!inter.ok) {

          const errorText = await inter.text();
          throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
        } else {

          const respo = await inter.json()
          // console.log(respo);
          this.posts = respo.notes

          console.log('Chargement tous les posts');
          if(this.posts.length == 0) this.message = 'Pas de notes jusque là'
        }

      } catch (error) {
        /* if(err.response) {
          this.message = err.response.data.error.message
        } else this.message = 'Erreur de connexion, verifiez le reseau'

        console.log('Error: ' + this.message); */

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);
      }

    },
    async addPost(payload) {
      try {
        this.message = ''
        // await axios.post(url, payload)

        const inter = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!inter.ok) {

          const errorText = await inter.text();
          throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
        } else {

          this.getAllPosts()
          console.log('Ajout nouveau post');
        }

      }catch (error) {
        alert("Erreur lors de l'ajout")
        console.log("Adding error:" + error);

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);

      }
    },
    async getPost(id) {

      try {
        this.message = ''

        // const respo = await axios.get(url + id)

        const inter = await fetch(url + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!inter.ok) {

          const errorText = await inter.json();
          throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
        } else {

          const respo = await inter.json()

          this.selectedPost = respo;
          // console.log(this.);
        }

        console.log('Chargement post: ' + id);
      } catch (error) {
        console.log(error);

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);
      }
    },
    async deletePost(id) {
      try{
        this.message = ''
        // await axios.delete(url + id)

        const inter = await fetch(url + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!inter.ok) {

          const errorText = await inter.text();
          throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
        } else {

          console.log('Suppression post: ' + id);
          alert(`Post : ${id} supprimé avec succès`)
          this.getAllPosts()
        }

      }catch(error){

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);
      }
    },
    async updatePost(id, updated) {
      try{
        this.message = ''
        // await axios.put(url + id, updated)

        const inter = await fetch(url + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated),
        })

        if (!inter.ok) {

          const errorText = await inter.text();
          throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
        } else {

          console.log('Modification post: ' + id);
          this.getPost(id)
        }

      }catch(error){

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);
        alert('Error: ' + this.message)
      }
    },
  },
  persist: true,
})
