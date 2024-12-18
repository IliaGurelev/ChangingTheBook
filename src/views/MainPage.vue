<template>
<div class="main-page">
	<header>
    <div class="search">
      <SearchIcon class="search__icon" />
      <input type="text" class="search__line" placeholder="Найти книгу" />
    </div>
    <button type="button" class="search__button">поиск</button>
    <RouterLink v-if="user != null"  class="message-button" to="/messages">
      <MessagerIcon />
    </RouterLink>
    <RouterLink class="login-button" to="/login" v-if="user == null">
      <ButtonStitched text="Войти" />
    </RouterLink>
    <UserButton  v-if="!isActiveUser && user != null" 
      class="user-button" 
      @click="() => changeActiveUser(true)"
      :avatarID="user.avatar_id"
    />
    <UserPopup v-else-if="isActiveUser && user != null" 
      class="user-popup" 
      @click="changeActiveUser(false)" 
      @logout="logoutUser"
      @my-books="toMyBooks"
      :user="user"
    />
  </header>
  <main>
    <BookList 
      :books="books"
      @clickBook="clickBook"
    />
    <BookPopup 
      v-if="isActivePopupBook" 
      :book="selectedBook"
      @sendMessage="sendMessage"
    />
  </main>
</div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { fetchBooks, fetchUser, addMessager } from '@/apiService';

import SearchIcon from '@/components/icons/SearchIcon.vue'
import MessagerIcon from '@/components/icons/MessagerIcon.vue'
import BookList from '@/components/BookList.vue'
import UserButton from '@/components/UserButton.vue';
import UserPopup from '@/components/UserPopup.vue';
import ButtonStitched from '@/components/ButtonStitched.vue';
import BookPopup from '@/components/BookPopup.vue';

const books = ref([]);
const user = ref(null);
const isActiveUser = ref(false);
const isActivePopupBook = ref(false);
const selectedBook = ref({});
const router = useRouter();

const clickBook = (book) => {
  isActivePopupBook.value = true;
  selectedBook.value = book;
}

function changeActiveUser(state) {
  isActiveUser.value = state;
}

async function loadData() {
  try {
    books.value = await fetchBooks();
    const userID = localStorage.getItem('userID')
    if(userID != undefined)
    {
      user.value = await fetchUser(userID);
      books.value = books.value.filter(book => book.id_owner !== Number(userID));
      console.log(userID);
      console.log(books.value)
    }
  } catch(error) {
    console.error("Ошибка загрузки данных: ", error);
  }
} 

async function sendMessage(id_owner) {
  await addMessager(id_owner, user.value.id)
  router.push({name: 'messages'});
}

function logoutUser() {
  localStorage.removeItem('userID');
  user.value = null;
}

function toMyBooks() {
  router.push({name: 'user'});
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
    transition: padding 0.3s;

    &:hover {
      padding: 3px;
    }
  }

  .login-button {
    button {
      height: 100%;
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