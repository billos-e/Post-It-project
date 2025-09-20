<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import FormItem from '../components/FormItem.vue'
import { usePosts } from '@/stores/counter';
import { useRoute, useRouter, RouterLink } from 'vue-router';

const store = usePosts()
const route = useRoute()
const router = useRouter()
const id = route.params.id;

const deletePost = async(id) => {
  // add alert
  store.deletePost(id)
  router.push('/')
};

const editPost = (updatedValue) => {

  // verifier si champs vides
  store.updatePost(id, updatedValue)
};

store.getPost(id)
</script>

<template>
  <HeaderItem />
  <RouterLink to="/"><-- Retour aux notes</RouterLink>
  <main>
    <div>
      <h1 class="font-bold">{{ store.selectedPost.title }}</h1>
      <span>modifié le : {{ store.selectedPost.updatedAt }}</span>
      <p>{{ store.selectedPost.content[0] }}</p>
    </div>

    <button command="show-modal" commandfor="dialog" class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10" >Modifier</button>
    <button @click="deletePost(id)">X</button>
  </main>

  <el-dialog>
    <dialog id="dialog" aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
      <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

      <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
          <FormItem  :initial-details="store.selectedPost" @form-submit="editPost" />
        </div>
      </div>
    </dialog>
  </el-dialog>
  <FooterItem />
</template>
