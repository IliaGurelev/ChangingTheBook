<template>
    <ul class="list">
        <li class="list__element" v-for="book in props.books" :key="book.id">
            <a href="#">
                <Book 
                    :previewImage=book.previewImage
                    :name=book.name
                    :description=book.description
                />
            </a>
        </li>
    </ul>
</template>

<script setup>
import Book from '@/components/MainPage/Book.vue'

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