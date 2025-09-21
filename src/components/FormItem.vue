<script setup>
import { watch, reactive } from 'vue';

const emit = defineEmits(['form-submit'])
const props = defineProps({
  initialDetails: Object,
  instruction: String
})

let details = reactive({
  title: '',
  content: ['']
})

watch(()=> props.initialDetails, (newData) => {

  if(props.initialDetails){
    details.title = newData.title || '',
    details.content[0] = newData.content[0] || ''
  }
}, {immediate: true})

const renderData = () => {
  // verifier si entrees vides
  emit('form-submit', {...details})
  details.title = '',
  details.content = ['']
}
</script>

<template>
  <div class=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
    <div class="mt-2">
      <label for="title">
        <span class="text-sm font+9-medium text-gray-700"> Titre </span>

        <input
          type="text"
          id="title"
          class="mt-0.5 w-full rounded px-4 py-3 shadow-inner shadow-gray-300 focus:boder-blue-100 sm:text-sm"
          v-model="details.title"
          placeholder="Court et descriptif"
        />
      </label>
      <label for="content">
        <span class="text-sm font-medium text-gray-700"> Contenu  </span>

        <textarea
          id="content"
          class="mt-0.5 w-full resize-none px-4 py-3 shadow-inner shadow-gray-300 focus:boder-blue-100 sm:text-sm"
          rows="4"
          v-model="details.content[0]"
          placeholder="A quoi pense-tu ?"
        ></textarea>
      </label>
    </div>
    <div class="flex justify-end gap-3 pt-6 ">
      <button @click="renderData" type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold bg-orange-200 text-orange-700 border border-orange-200 font-medium rounded-lg hover:bg-orange-100 hover:border-orange-300 disabled:opacity-200 disabled:cursor-not-allowed disabled:hover:bg-orange-200  sm:mt-0 sm:w-auto">Soumettre</button>
      <button type="button" command="close" commandfor="dialog" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring border inset-ring-gray-300 hover:bg-blue-50 sm:mt-0 sm:w-auto">Annuler</button>
    </div>
  </div>
</template>

<style>

</style>
