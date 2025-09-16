<script setup>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
</script>

<template>
  <HeaderItem />
  <div id="edit-line">
    <button>Coucher une idée</button>
    <button>Remettre à blanc</button>
  </div>
  <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div class="post">
      <div>
        <h3>Titre</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sint ut recusandae sit omnis similique itaque ullam sed dolorum minima distinctio iusto quam reiciendis fugiat facere, quia nesciunt provident vel?
        </p>
      </div>
    </div>
    <div class="post">
      <div>
        <h3>Titre</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sint ut recusandae sit omnis similique itaque ullam sed dolorum minima distinctio iusto quam reiciendis fugiat facere, quia nesciunt provident vel?
        </p>
      </div>
    </div>
    <div class="post">
      <div>
        <h3>Titre</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sint ut recusandae sit omnis similique itaque ullam sed dolorum minima distinctio iusto quam reiciendis fugiat facere, quia nesciunt provident vel?
        </p>
      </div>
    </div>
    <div class="post">
      <div>
        <h3>Titre</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sint ut recusandae sit omnis similique itaque ullam sed dolorum minima distinctio iusto quam reiciendis fugiat facere, quia nesciunt provident vel?
        </p>
      </div>
    </div>
    <div class="post">
      <div>
        <h3>Titre</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sint ut recusandae sit omnis similique itaque ullam sed dolorum minima distinctio iusto quam reiciendis fugiat facere, quia nesciunt provident vel?
        </p>
      </div>
    </div>
  </div>
  <FooterItem />
</template>
