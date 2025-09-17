<script setup>
import { ref } from 'vue';
const props = defineProps({
    post: Object
})

console.log(props.post.value)
const oldTitle = ref('');
const oldContent = ref('');
</script>

<template>
    <div>
        <!-- add mehtod and submit.prevent -->
        <form action="">
            <div>
                <label for="title">Titre</label>
                <input v-model="oldTitle" type="text" name="title" id="title" placeholder="De quoi s'agit il ?">
            </div>
            <div>
                <label for="content">Contenu</label>
                <textarea v-model="oldContent" type="text" name="content" id="content" placeholder="Laissez parler votre plume..."></textarea>
            </div>
        </form>
    </div>
    <div>
        <button id ="abort">Annuler</button>
        <button id ="submit">Soumettre</button>
    </div>
</template>

<style>

</style>
