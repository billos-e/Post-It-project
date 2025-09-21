<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import FormItem from '../components/FormItem.vue'
import { usePosts } from '@/stores/counter'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const store = usePosts()
const route = useRoute()
const router = useRouter()
const id = route.params.id

// ajout gestion erreur et page vide
const deletePost =  () => {
  if(confirm('Voulez vous vraiment supprimer ce post ?') == true) {
    console.log('Toni ehh');

    store.deletePost(id)
  }
  router.push('/')
}

const editPost = (updatedValue) => {
  // verifier si champs vides
  store.updatePost(id, updatedValue)
}

const formatFrenchDate = (isoString) => {
  const date = new Date(isoString);

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };

  const formattedDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat('fr-FR', timeOptions).format(date);

  return `${formattedDate} à ${formattedTime}`;
}

store.getPost(id)
</script>

<template>
  <header>
    <HeaderItem />
  </header>
  <main class="flex-1">

      <div class="bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RouterLink :to="{name:'home'}">
            <button
              class="inline-flex items-center gap-2 px-4 py-2 mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150 cursor-pointer font-medium focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 outline-none"
            >
              <span class="material-symbols-outlined"> arrow_back </span>
              Retour aux post-its
            </button>
          </RouterLink>
          <div class="rounded-xl border-2 shadow-sm relative bg-blue-50 border-blue-200">
            <div class="absolute top-6 right-6 flex gap-3">
              <button
                command="show-modal"
                commandfor="dialog"
                class="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:shadow-lg hover:scale-105 hover:border-blue-200 transition-all duration-200 group cursor-pointer"
                title="Modifier cette note"
              >
                <svg
                  class="w-5 h-5 text-gray-600 group-hover:text-blue-900 transition-colors duration-150"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg></button
              ><button
                @click="deletePost"
                class="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:shadow-lg hover:scale-105 hover:border-orange-200 transition-all duration-200 group cursor-pointer"
                title="Supprimer cette note"
              >
                <svg
                  class="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors duration-150"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="p-8">
              <div class="mb-6 pr-0 sm:pr-12 md:pr-16 lg:pr-24">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {{ store.selectedPost.title }}
                </h1>
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6"
                >
                  <p class="flex items-center gap-1.5 sm:gap-1">
                    <svg
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path></svg
                    ><span class="whitespace-nowrap">modifié le {{ formatFrenchDate(store.selectedPost.updatedAt) }}</span>
                  </p>
                  <p class="flex items-center gap-1.5 sm:gap-1">
                    <svg
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path></svg
                    ><span class="whitespace-nowrap">{{ store.selectedPost.content[0].length }} caractères</span>
                  </p>
                </div>
              </div>
              <div class="prose max-w-none">
                <p
                  class="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere"
                >
                  {{ store.selectedPost.content[0] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <el-dialog>
      <dialog
        id="dialog"
        aria-labelledby="dialog-title"
        class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
      >
        <div
          class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        ></div>

        <div
          tabindex="0"
          class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <FormItem :initial-details="store.selectedPost" @form-submit="editPost" />
          </div>
        </div>
      </dialog>
    </el-dialog>
  </main>

  <footer>
    <FooterItem />
  </footer>
</template>
