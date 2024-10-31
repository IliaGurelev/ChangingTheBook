<template>
  <div class="recipient" :class=" props.selected ? 'recipient--selected' : ''">
    <Avatars class="recipient__img" :avatarID="props.previewImage" />
    <div class="wrap">
      <p class="recipient__title">{{ props.name }}</p>
      <!-- <p class="recipient__last-message">Да я могу приехать на вокзал</p> -->
    </div>
  </div>
</template>

<script setup>
import Avatars from '@/components/Avatars.vue';

const props = defineProps({
  selected: {
    type: Boolean,
    required: false,
    default: false
  },
  name: {
    type: String,
    required: true,
  },
  previewImage: {
    type: Number,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.recipient {
  display: flex;
  column-gap: 10px;
  background-color: #faf2e9;
  padding: 10px 5px;
  border-radius: 10px;
  cursor: pointer;

  &--selected {
    border: 2px solid #b09d8a;
  }

  &__img {
    object-fit: contain;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  &__title {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

    font-size: 20px;
    color: #65473e;
  }

  &__last-message {
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 15px;
    color: #ef7677;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>