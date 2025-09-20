<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import FormItem from '../components/FormItem.vue'
import GridItem from '../components/GridItem.vue'
import {RouterLink, useRouter} from 'vue-router'
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios'
import { usePosts } from '@/stores/counter';

//penser à gerer la persistance

const store = usePosts()
// const title = ref('');
// const content = ref('');
// const router = useRouter()



const deleteAll = () => {};

onMounted(() => {
  store.getAllPosts()
  store.selectedPost = null;
})
</script>

<template>
  <!-- {{ store.getAllPosts() }} -->
  <HeaderItem />
  <div class="h-full">

    <div id="edit-line">
      <button @click="deleteAll">Remettre à blanc</button>
      <button command="show-modal" commandfor="dialog" class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10" >Coucher une idée</button>
    </div>
    <GridItem />
      <el-dialog>
      <dialog id="dialog" aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
        <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

        <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <!-- <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                      <span class="text-sm font-medium text-gray-700"> Contenu  </span>

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
              </div>
            </div> -->

        <!-- <div class=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="mt-2">
              <label for="title">
                <span class="text-sm font+9-medium text-gray-700"> Titre </span>

                <input
                  type="text"
                  id="title"
                  class="mt-0.5 w-full rounded border px-4 py-3 border-gray-300 shadow-sm sm:text-sm"
                  v-model="title"
                  placeholder="Court et descriptif"
                />
              </label>
              <label for="content">
                <span class="text-sm font-medium text-gray-700"> Contenu  </span>

                <textarea
                  id="content"
                  class="mt-0.5 w-full resize-none rounded border px-4 py-3 border-gray-300 shadow-sm sm:text-sm"
                  rows="4"
                  v-model="content"
                  placeholder="A quoi pense-tu ?"
                ></textarea>
              </label>
            </div>
            <div class="flex justify-end gap-3 pt-6 ">
              <button @click="addPost" type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:mt-0 sm:w-auto">Soumettre</button>
              <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring border inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
            </div>
          </div> -->
          <FormItem @form-submit="store.addPost" />
            <!-- <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button @click="addPost" type="button" command="close" commandfor="dialog" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Soumettre</button>
              <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring border inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
            </div> -->
          </div>

        </div>

      </dialog>
    </el-dialog>
  </div>



  <FooterItem class="bottom-fixing sticky bottom-0" />
</template>
