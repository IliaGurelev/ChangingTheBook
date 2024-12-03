<template>
  <img v-if="props.avatarID != 0" :src="pathImage" alt="">
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  avatarID: {
    type: Number,
    required: true,
  }
})

const pathImage = computed(() => {
  return `/avatar${props.avatarID}.png`;
});
</script>

<style lang="scss" scoped>
img {
  object-fit: fill;
}
</style>