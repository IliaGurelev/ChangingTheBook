<template>
<div class="image-wrapper">
    <img class="image" :src="previewImage">
</div>
<a class="name-book">{{props.name}}</a>
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
    }
})
</script>

<style lang="scss" scoped>
.image-wrapper {
    border-radius: 3px;
    position: relative;
    max-width: 236px;
    max-height: 236px;
    width: 100%;
    height: 236px;
    overflow: hidden;
}

.image {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.name-book {
    color: #775c53;
}
</style>