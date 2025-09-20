<script setup>
import { usePosts } from '@/stores/counter';
import { ref, onMounted } from 'vue';

const store = usePosts()
const emit = defineEmits(['form-submit'])

let title = ref('')
let content = ref('')

const renderData = () => {
  // verifier si entrees vides
  emit('form-submit', {
    "title": title.value,
    "content": [ content.value ]
  })
}

onMounted(()=>{
  if (store.selectedPost) {

    title.value = store.selectedPost.title
    content.value = store.selectedPost.content[0]
  }
})
</script>

<template>
  <div class=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
      <button @click="renderData" type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:mt-0 sm:w-auto">Soumettre</button>
      <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring border inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
    </div>
  </div>
</template>

<style>

</style>
