<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import {RouterLink} from 'vue-router'
import { ref } from 'vue';

let posts = ref([]);

(async ()=> {
  const respo = await fetch('https://post-it.epi-bluelock.bj/notes/')
  const result= await respo.json()
  posts.value = result['notes']
  // console.log(posts);
  
})()
console.log(posts);


const addPost = () => {};
const deleteAll = () => {};
const deletePost = (id) => {};
const editPost = (id) => {};
</script>

<template>
  <HeaderItem />
  <div id="edit-line">
    <button @click="addPost">Coucher une idée</button>
    <button @click="deleteAll">Remettre à blanc</button>
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
  <FooterItem />
</template>
