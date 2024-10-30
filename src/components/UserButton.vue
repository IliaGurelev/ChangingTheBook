<template>
  <div class="wrap">
    <Avatars class="image" :avatarID="props.avatarID" />
  </div>
</template>

<script setup>
import Avatars from '@/components/Avatars.vue';

const props = defineProps({
  avatarID: {
    type: Number,
    required: true,
  }
});
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-shrink: 0; 
  width: 54px;
  height: 54px;
  background-color: #f8f0e4;
  border-radius: 50%;
  align-items: center;
}

.image {
  width: 50px;
  height: auto;
  cursor: pointer;
  padding: 7px;
  transition: padding 0.6s;

  &:hover {
    padding: 8px;
  }
}
</style>