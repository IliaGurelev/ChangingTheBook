<template>
  <ul class="list">
    <li class="list__element" v-for="book in props.books" :key="book.id">
      <Book 
        :previewImage=book.preview_image
        :name=book.name
        :description=book.description
        @click="$emit('clickBook', book)"
      />
    </li>
  </ul>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Book from '@/components/Book.vue';

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  column-gap: 30px;
  row-gap: 30px;
  flex-wrap: wrap;

  &__element {
    max-width: 236px;
  }
}
</style>