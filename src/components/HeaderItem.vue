<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="py-6 mb-6 bg-[#003747]/90 backdrop-blur-sm shadow-sm border-b ">
    <div class="text-white text-center">
      <RouterLink :to="{name:'home'}" class="text-2xl sm:text-3xl font-semibold " >
        THE Post It
      </RouterLink>
      <p>Là où reposent vos idées</p>
    </div>
  </div>
</template>
