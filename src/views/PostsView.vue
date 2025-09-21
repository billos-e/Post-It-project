<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import FormItem from '../components/FormItem.vue'
import GridItem from '../components/GridItem.vue'
import { usePosts } from '@/stores/counter';
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue';

//penser à gerer la persistance
// ajout gestion erreur et page vide

const store = usePosts();
const router = useRouter();
let rocketGetter = null

const deletePost = (id) => {
    if(confirm('Voulez vous vraiment supprimer ce post ?') == true) {

    store.deletePost(id)

    if(store.message == '') {
      router.push('/')
    }
  }
};

onMounted(() => {
  store.getAllPosts()

  rocketGetter = setInterval(() => {
    console.log("Vérification des mises à jour...")
    store.getAllPosts()
  }, 15000)
})

onUnmounted(() => {
  clearInterval(rocketGetter)
})
// store.getAllPosts();
</script>

<template >
  <header class="sticky top-0 left-0 z-50">

    <HeaderItem />
  </header>
  <main class="flex-1">
    <div class="h-full">

      <div id="edit-line" class=" flex flex-row items-center justify-end gap-4">
        <!-- <button @click="deleteAll">Remettre à blanc</button> -->
        <button command="show-modal" commandfor="dialog" class="inline-flex items-center m-5 gap-2 px-4 py-2.5 bg-orange-50 text-orange-700 border border-orange-200 font-medium rounded-lg hover:bg-orange-100 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-50 transition-all duration-150 group cursor-pointer focus:ring-2 focus:ring-orange-200 focus:ring-opacity-50 outline-none" >Prendre note</button>
      </div>
      <GridItem @delete="deletePost"/>
      <el-dialog>
        <dialog id="dialog" aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
          <div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

          <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              <FormItem @form-submit="store.addPost" />
            </div>
          </div>
        </dialog>
      </el-dialog>
    </div>
  </main>

  <footer>

    <FooterItem class="bottom-fixing sticky bottom-0" />
  </footer>

</template>
