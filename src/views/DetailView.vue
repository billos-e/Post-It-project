<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'

import { useRoute } from 'vue-router';
const route = useRoute()
// console.log(route.params)
const id = route.params.id;
</script>

<template>
  <HeaderItem />
  <main>
    <p>Detail page of {{ id }}</p>
  </main>
  <FooterItem />
</template>
