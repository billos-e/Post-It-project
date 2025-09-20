<script setup >
import { ref } from 'vue'
import { usePosts } from '@/stores/counter';


const store = usePosts()
console.log(store);
</script>

<template>
  <section class="bg-gray-2 pt-20 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="container mx-auto">
      <div class="grid grid-cols-4 gap-3 mx-2">
        <template v-for="post in store.posts" :key="post._id">
          <RouterLink :to="{name: 'note', params: { id: post._id }}">
            <div class="max-w-sm h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm ">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ post.title.slice(0, 15) }}</h5>
              <p class="mb-3 break-words whitespace-pre-wrap font-normal text-gray-700 ">{{ post.content[0].slice(0, 50) }} ...</p>
            </div>
          </RouterLink>
        </template>
      </div>
    </div>
  </section>
</template>
