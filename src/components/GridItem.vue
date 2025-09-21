<script setup >
import { usePosts } from '@/stores/counter';

const store = usePosts()
</script>

<template>
  <section class="bg-gray-2 pt-5 pb-10 lg:pb-20">
    <div class="container mx-auto">
      <div v-if="store.message != ''" class="text-gray-800 italic text-center">{{ store.message }}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-2">
        <template v-for="post in store.posts" :key="post._id">
          <div class="relative group">
            <button
              @click="$emit('delete', post._id)"
              class="absolute top-3 right-3 p-3 bg-white/90 backdrop rounded-full opacity-0 group-hover:opacity-100 hover:scale-110 hover:border-orange-200 transition-all duration-200 group cursor-pointer"
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
            <RouterLink :to="{name: 'note', params: { id: post._id }}">
              <div class="max-w-sm h-full p-6 bg-white border border-gray-200 rounded-sm hover:shadow-lg ">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ post.title.slice(0, 15) }}</h5>
                <p class="mb-3 break-words whitespace-pre-wrap font-normal text-gray-700 ">{{ post.content[0].slice(0, 50) }} ...</p>
              </div>
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
