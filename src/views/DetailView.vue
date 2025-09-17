<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import FormItem from '../components/FormItem.vue'
import { ref } from 'vue';

import { useRoute, RouterLink } from 'vue-router';
const route = useRoute()
// console.log(route.params)
const id = route.params.id;

let post = ref({});

(async ()=> {
  const respo = await fetch(`https://post-it.epi-bluelock.bj/notes/${id}`)
  const result= await respo.json()
  post.value = result
  console.log(post);
  
})()
// console.log(post);
const showModal = ref(false)

const deletePost = (id) => {};
const editPost = (id) => {};
const onToggle = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <HeaderItem />
  <RouterLink to="/"><-- Retour aux notes</RouterLink>
  <main>
    <div>
      <h1 class="font-bold">{{ post.title }}</h1>
      <span>modifié le : {{ post.updatedAt }}</span>
      <p>{{ post.content[0] }}</p>
    </div>
    <button @click="editPost(post._id)">E</button>
    <button @click="deletePost(post._id)">X</button>
  </main>
  
  <FooterItem />
  <div id="app">
    <div class="flex flex-col items-center justify-center p-3 min-h-full">
      <h1
        class="my-4 text-3xl text-center font-medium tracking-wider text-purple-700"
      >
        Vue.js Modal transition
      </h1>
      <button
        @click="onToggle"
        class="bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
      >
        Open
      </button>
    </div>
    <transition name="fade">
      <div v-if="showModal">
        <div
          @click="onToggle"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
          class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <!-- <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-16 h-16 flex items-center text-purple-500 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <h2 class="text-2xl font-bold py-4">Are you sure?</h2>
              <p class="text-md text-gray-500 px-8">
                Do you really want to exit without saving your work?
              </p>
            </div>
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
          </div> -->
          <FormItem></FormItem>
        </div>
      </div>
    </transition>
  </div>
</template>
