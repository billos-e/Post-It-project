import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
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

        if(this.message == 'sync') return
        this.message = ''

        // const respo = await axios.get(url)

        const inter = await fetch(url, {
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

          const errorText = await inter.json();
          throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
        } else {

          // this.getAllPosts()
          console.log('Ajout nouveau post');

          // local update
          const respo = await inter.json()
          alert(respo);

          return respo.note_id;
        }

      }catch (error) {
        alert("Erreur lors de l'ajout")
        console.log("Adding error:" + error);

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);

      }
    },
    async getPost(id) {
      // Elle ne sera plus utilisée
      // return
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

          const errorText = await inter.json();
          if(errorText.error.message !== 'Ressource not found') {
            throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);
          }

          console.log('Suppression post: ' + id);
          // alert(`Post : ${id} supprimé avec succès`)
          // this.getAllPosts()
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

          const errorText = await inter.json();
          if(errorText.error.message == 'Ressource not found') {
            this.posts = this.posts.filter(n => n._id !== id)
            alert(`Le post ${id} à été supprimé alors que vous etiez deconnecté. Les modifications n'ont pas été appliquées`)
          } else throw new Error(`Erreur HTTP: ${inter.status} - ${errorText.error.message}`);

        } else {

          console.log('Modification post: ' + id);
          // this.getPost(id) // a supprimer sans doute
        }

      }catch(error){

        this.message = 'Erreur de connexion ou du serveur: ' + error.message;
        console.log('Error: ' + this.message);
        // alert('Error: ' + this.message)
      }
    },
    //-----------------------------------------
    // Mis à jour pour local first
    async retrieveNote(id) {
      const index = this.posts.findIndex(n => n._id === id)
      if(index !== -1) {
        this.selectedPost = this.posts[index]
      } else {
        // si le post n'est pas dispo en local, on essai de le trouver depuis l'api
        this.getPost(id)
      }
    },

    async createNote(noteData) {
      const now = new Date()
      const newNote = {
        ...noteData,
        _id: uuidv4(),
        syncStatus: 'new',
        updatedAt: now.toISOString()
      }
      this.posts.unshift(newNote)
    },

    async updateNote(id, updatedData) {
      const index = this.posts.findIndex(note => note._id === id)

      if (index !== -1) {

        const newStatus = this.posts[index].syncStatus === 'new' ? 'new' : 'updated'

        this.posts[index] = {
          ...this.posts[index],
          ...updatedData,
          syncStatus: newStatus
        }
        this.retrieveNote(id)
      } else alert('Note probablement supprimée')

    },

    async deleteNote(id) {
      const index = this.posts.findIndex(note => note._id === id)
      if (index !== -1) {
        if (this.posts[index].syncStatus === 'new') {
          this.posts.splice(index, 1)
        } else {
          this.posts[index].syncStatus = 'deleted'
        }
      }
    },
    // le big boss

    async syncWithApi() {
      // On récupère une copie des notes à synchroniser pour ne pas avoir de problème
      // console.log('Debut de la synchro');

      const notesToSync = this.posts.filter(note => note.syncStatus)

      for (const note of notesToSync) {
        try {
          switch (note.syncStatus) {
            case 'new':
              { const notePayload = { title: note.title, content: [note.content[0]] }

              const realId = await this.addPost(notePayload)
              const index = this.posts.findIndex(n => n._id === note._id)
              if(index !== -1) {
                this.posts[index]._id = realId
                delete this.posts[index].syncStatus
              }
              break; } // j'ai ajouté des acolades ici

            case 'updated':
              await this.updatePost(note._id, { title: note.title, content: [note.content[0]] })
              delete this.posts.find(n => n._id === note._id).syncStatus
              break;

            case 'deleted':
              await this.deletePost(note._id)

              this.posts = this.posts.filter(n => n._id !== note._id)
              break;
          }
        } catch (error) {
          console.error("Échec de la synchronisation pour la note :", note._id, error, 'operation :', note.syncStatus)
        }
      }
      console.log('Fin de la synchro');
      this.getAllPosts()
    },
  },
  getters: {
    // Un getter pour que l'UI n'affiche que les notes non supprimées
    visibleNotes: (state) => {
      return state.posts.filter(note => note.syncStatus !== 'deleted')
    }
  },
  persist: true,
})
