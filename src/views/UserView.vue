<template>
 <header class="header">
    <Avatars class="header__avatar" :avatarID="user.avatar_id"/>
    <div>
      <p class="header__name">{{user.name}}</p>
      <p class="header__email">{{user.email}}</p>
    </div>
    <RouterLink to="/">
      <LogoMini class="header__logo" />
    </RouterLink>
 </header>
 <body class="books">
  <div @click="showAddPopup" class="books__add-book add-book">
    <div class="add-book__icon">
      <BookAddIcon />
    </div>
    <p class="add-book__name">Добавить объявление</p>
  </div>
  <BookList class="books__list" :books="books" @clickBook="(book) => showEditPopup(book)" /> 
  <AddBookPopup 
    v-if="isShowAddPopup" 
    class="AddPopup" 
    :idUser="Number(idUser)"
  />
  <EditBookPopup 
    v-if="isShowEditPopup" 
    :idUser="Number(idUser)" 
    :productData="selectedBook" 
    @deleteBook="changedBook"
    @editBook="changedBook"
  />
 </body>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchBooksToIdOwner, fetchUser } from '@/apiService';
import { RouterLink } from 'vue-router';

import EditBookPopup from '@/components/EditBookPopup.vue';
import Avatars from '@/components/Avatars.vue';
import LogoMini from '@/components/LogoMini.vue';
import BookList from '@/components/BookList.vue';
import BookAddIcon from '@/components/icons/BookAddIcon.vue';
import AddBookPopup from '@/components/AddBookPopup.vue';

const books = ref([]);
const idUser = ref(0);
const user = ref({});
const isShowAddPopup = ref(false);
const isShowEditPopup = ref(false);
const selectedBook = ref({});

async function loadData() {
  idUser.value = localStorage.getItem('userID');
  user.value = await fetchUser(idUser.value);
  books.value = await fetchBooksToIdOwner(idUser.value);
}

function showAddPopup() {
  isShowAddPopup.value = true;
  isShowEditPopup.value = false;
}

function showEditPopup(book) {
  selectedBook.value = book;

  isShowEditPopup.value = true;
  isShowAddPopup.value = false;
}

async function changedBook() {
  isShowEditPopup.value = false;
  books.value = await fetchBooksToIdOwner(idUser.value);
}

onMounted(() => {
  loadData();
})
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  padding: 30px 80px;
  display: flex;
  column-gap: 30px;
  max-height: 400px;
  align-items: end;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 95%;
    height: 3px;
    background-color: #f3ebe1;
  }

  &__avatar {
    max-width: 200px;
    width: 100%;
    height: auto;
  }

  &__name {
    font-size: 60px;
    color: #65473e;
  }

  &__email {
    font-size: 30px;
    color: #65473e;
  }

  &__logo {
    position: absolute;
    top: 20px;
    right: 50px;
    z-index: 0;
  }
}

.books {
  padding: 20px;
  display: flex;
  column-gap: 30px;
}

.add-book {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 236px;
  cursor: pointer;
  background-color: #fbf8f5;
  border-radius: 10px;
  padding: 10px;

  &:hover {
    .add-book__icon {
      padding: 35px !important;
    }
  }

  &__icon {
    width: 100%;
    padding: 40px;
    border: 5px dashed #0000002d;
    border-radius: 2px;
    transition: padding 0.1s linear;
  }

  &__name {
    color: #64463c;
    font-size: 17px;
  }
}
</style>