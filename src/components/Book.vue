<template>
<div class="book">
    <div class="book__image-wrap">
        <img class="book__image" :src="previewImage">
    </div>
    <p class="book__name">{{props.name}}</p>
    <p class="book__description">{{props.description}}</p>
</div>
</template>

<script setup>
const props = defineProps({
    previewImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.book {
    &__image-wrap {
        position: relative;
        max-width: 236px;
        max-height: 236px;
        margin-bottom: 7px;
        border-radius: 3px;
        background-color: #e9e5e2;
        width: 100%;
        height: 236px;
        overflow: hidden;
    }

    &__image {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;

        &:hover {
            transform: scale(1.1);
        }
    }

    &__name {
        color: #64463c;
    }

    &__description {
        color: #ed5d5f;
        font-size: 12px;
    }
}
</style>