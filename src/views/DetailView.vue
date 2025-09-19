<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import FormItem from '../components/FormItem.vue'
import { usePosts } from '@/stores/counter';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';

const store = usePosts()
const route = useRoute()
const router = useRouter()
const id = route.params.id;

let title = ref('')
let content = ref('')
let update = ref('')
let onEdit = ref(false)

const deletePost = async(id) => {
  store.deletePost(id)
  router.push('/')
};

const editPost = (id) => {

  onEdit.value = false
  store.updatePost(id, {
    "title": title.value,
    "content": [
        `${content.value}`
    ]
  })
};

// console.log(store.selectedPost);


onMounted(async ()=>{
  await store.getPost(id)
  // console.log();

  title.value = store.selectedPost.title
  content.value = store.selectedPost.content[0]
  update.value = store.selectedPost.updatedAt
})
</script>

<template>
  <HeaderItem />
  <RouterLink to="/"><-- Retour aux notes</RouterLink>
  <main v-if="!onEdit">
    <div>
      <h1 class="font-bold">{{ title }}</h1>
      <span>modifié le : {{ update }}</span>
      <p>{{ content }}</p>
    </div>

    <button @click="onEdit = true" class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10">E</button>
    <button @click="deletePost(id)">X</button>
  </main>
  <div v-else-if="onEdit">
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 id="dialog-title" class="text-base font-semibold text-gray-900">Ajouter un post</h3>
        <div class="mt-2">
          <label for="title">
            <span class="text-sm font-medium text-gray-700"> Titre </span>

            <input
              type="text"
              id="title"
              class="mt-0.5 w-full rounded border px-4 py-3 border-gray-300 shadow-sm sm:text-sm"
              v-model="title"
              placeholder="Court et descriptif"
            />
          </label>
          <label for="content">
            <span class="text-sm font-medium text-gray-700"> Contenu </span>

            <textarea
              id="content"
              class="mt-0.5 w-full resize-none rounded border px-4 py-3 border-gray-300 shadow-sm sm:text-sm"
              rows="4"
              v-model="content"
              placeholder="A quoi pense-tu ?"
            ></textarea>
          </label>
        </div>
      </div>
      <div>
        <button @click="editPost(id)" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Soumettre</button>
        <button @click="onEdit = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring border inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
      </div>
    </div>
  </div>
  <!-- Edit  -->
  <!-- <el-dialog>
    <dialog id="dialog" aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
      <el-dialog-backdrop class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

      <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
        <el-dialog-panel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button @click="editPost(id)" type="button" command="close" commandfor="dialog" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Soumettre</button>
            <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring border inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
          </div>
        </el-dialog-panel>
      </div>
    </dialog>
  </el-dialog> -->
  <FooterItem />
</template>
