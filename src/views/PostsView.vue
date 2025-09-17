<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import {RouterLink} from 'vue-router'
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios'

let posts = ref([]);
let showAdd = reactive(false)

const onToggle = () => {
  console.log(showAdd);

  showAdd = !showAdd
  console.log(showAdd);
}

const getAllPosts = async ()=> {
  const respo = await axios.get('https://post-it.epi-bluelock.bj/notes')
  posts.value = respo.data.notes
  // console.log(respo);

}
console.log(posts);

const addPost = () => {};
const deleteAll = () => {};

const deletePost = async (id) => {
  await axios.delete(`https://post-it.epi-bluelock.bj/notes/${id}`)
  getAllPosts()
};
const editPost = (id) => {};

onMounted(getAllPosts)
</script>

<template>
  <HeaderItem />
  <div id="edit-line">
    <button @click="deleteAll">Remettre à blanc</button>
    <button command="show-modal" commandfor="dialog" class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10" @click="onToggle">Coucher une idée</button>
  </div>
  <div id="grid" class="border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div v-for="post in posts" :key='post' class="post shadow-sm">
        <RouterLink :to="{name: 'note', params: { id: post._id }}">
          <h3>{{ post.title }}</h3>
          <p>
            {{ post.content[0] }}
          </p>
        </RouterLink>
        <button @click="editPost(post._id)">E</button>
        <button @click="deletePost(post._id)">X</button>
      </div>
  </div>

<el-dialog>
  <dialog id="dialog" aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
    <el-dialog-backdrop class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

    <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
      <el-dialog-panel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 id="dialog-title" class="text-base font-semibold text-gray-900">Ajouter un post</h3>
              <div class="mt-2">
                <label for="title">
                  <span class="text-sm font-medium text-gray-700"> Title </span>

                  <input
                    type="text"
                    id="title"
                    class="mt-0.5 w-full rounded border px-4 py-3 border-gray-300 shadow-sm sm:text-sm"
                  />
                </label>
                <label for="content">
                  <span class="text-sm font-medium text-gray-700"> Content  </span>

                  <textarea
                    id="content"
                    class="mt-0.5 w-full resize-none rounded border px-4 py-3 border-gray-300 shadow-sm sm:text-sm"
                    rows="4"
                  ></textarea>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" command="close" commandfor="dialog" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Soumettre</button>
          <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
        </div>
      </el-dialog-panel>
    </div>
  </dialog>
</el-dialog>


  <!-- <transition name="fade">
      <div v-if="showAdd">
        <div
          @click="onToggle"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
          class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <div>
            <FormItem />
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
              >
                Save
              </button>
              <button
                @click="onToggle"
                class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
  <FooterItem />
</template>
