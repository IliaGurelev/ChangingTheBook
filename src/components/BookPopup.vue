<template>
  <div class="product">
    <div class="product__image-container">
      <img :src="book.preview_image" alt="Фото товара" class="product__image">
    </div>
    <div class="product__info">
      <div class="product__avatar-container">
        <p class="product__name-owner">{{owner.name}}</p>
        <Avatars class="product__avatar" :avatarID="owner.avatar_id" />
      </div>
      <h1 class="product__title">{{ book.name }}</h1>
      <p class="product__description">
        {{ book.description }}
      </p>
      <button class="product__button" @click="$emit('sendMessage', owner.id)">Написать</button>
    </div>
  </div>
</template>

<script setup>
import Avatars from '@/components/Avatars.vue';
import { watchEffect, ref } from 'vue';
import { fetchUser } from '@/apiService';

const props = defineProps({
  book: {
    type: Object,
    required: true,
  }
})

const owner = ref({});

watchEffect(async () => {
  if (props.book.id_owner) {
    owner.value = await fetchUser(props.book.id_owner);
  }
});
</script>

<style lang="scss" scoped>
$product-bg-color: #f9f9f9;
$product-border-color: #e0e0e0;
$product-title-color: #333;
$product-desc-color: #555;
$button-bg-color: #f06465;
$button-hover-bg-color: #e6434c;
$button-text-color: #fff;

.product {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  max-width: 800px;
  background-color: #fff; 
  border: 1px solid $product-border-color;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__info {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    font-size: 24px;
    color: $product-title-color;
    margin: 0 0 12px;
  }

  &__description {
    font-size: 16px;
    color: $product-desc-color;
    margin-bottom: 20px;
  }

  &__button {
    padding: 10px 20px;
    background-color: $button-bg-color;
    color: $button-text-color;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $button-hover-bg-color;
    }
  }

  &__image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }

  &__image {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  &__avatar-container {
    display: flex;
    align-items: center;
    align-self: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
    padding: 6px 25px;
    column-gap: 10px;
    box-shadow: 0px 0px 5px #3f3f3f38;
    border-radius: 50px;
  }

  &__avatar {
    width: 40px;
  }

  &__name-owner {
    font-size: 20px;
    color: $product-title-color;
  }
}
</style>