<template>
<div class="main-page">
	<header>
    <div class="search">
      <SearchIcon class="search__icon" />
      <input type="text" class="search__line" placeholder="Найти книгу" />
    </div>
    <button type="button" class="search__button">поиск</button>
    <MessagerIcon class="message-button" />
    <ButtonStitched v-if="user == null" text="Войти" />
    <UserButton  v-if="!isActiveUser && user != null" class="user-button" @click="() => changeActiveUser(true)"/>
    <UserPopup v-else-if="isActiveUser && user != null" class="user-popup" @click="changeActiveUser(false)" />
  </header>
  <main>
    <BookList 
      :books="books"
    />
  </main>
</div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

import { fetchBooks } from '@/apiService';

import SearchIcon from '@/components/icons/SearchIcon.vue'
import MessagerIcon from '@/components/icons/MessagerIcon.vue'
import BookList from '@/components/BookList.vue'
import UserButton from '@/components/UserButton.vue';
import UserPopup from '@/components/UserPopup.vue';
import ButtonStitched from '@/components/ButtonStitched.vue';

const books = ref([]);
const user = ref(null);
const isActiveUser = ref(false);

async function loadData() {
  try {
    books.value = await fetchBooks();
  } catch(error) {
    console.error("Ошибка загрузки данных: ", error);
  }
} 

function changeActiveUser(state) {
  isActiveUser.value = state;
}

onMounted(() => {
  loadData();
})
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  row-gap: 50px;
}

header {
  position: relative;
  display: flex;
  column-gap: 20px;
  height: 54px;

  .search {
    display: flex;
    background: #f8f0e4;
    padding: 15px;
    border-radius: 25px;
    width: 100%;

    &__icon {
      width: 25px;
      margin-right: 15px;
    }

    &__line {
      background: transparent;
      border: none;
      width: 100%;
      font-size: 18px;

      &:focus {
        outline: none;
      }
    }

    &__button {
      position: relative;
      display: inline-block;
      max-width: 160px;
      width: 100%;
      border: none;
      border-radius: 25px;
      box-shadow: 0 5px 5px #c0383825;
      color: white;
      font-size: 18px;
      font-weight: 800;
      text-align: center;
      padding: 10px 50px;
      background: transparent;
      overflow: hidden;
      cursor: pointer;
      z-index: 1; 

      &::before {
        content: '';
        position: absolute;
        top: -2.5%;
        left: -2.5%;
        width: 105%;
        height: 105%;
        background: linear-gradient(60deg, #74699c 20%, #6eaf72, #fcba65, #db4d51 85%);
        filter: blur(3px);
        transition: transform 0.3s;
        z-index: -1;
      }

      &:hover::before {
        transform: scale(120%);
      }
    }
  }

  .message-button {
    max-width: 54px;
    width: 100%;
    cursor: pointer;
    padding: 7px;
    transition: padding 0.3s;

    &:hover {
      padding: 8px;
    }
  }

  .user-popup {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
</style>