<template>
<div class="main-page">
	<header>
    <div class="search">
      <SearchIcon class="search__icon" />
      <input type="text" class="search__line" placeholder="Найти книгу" />
    </div>
    <button type="button" class="search__button">поиск</button>
    <MessagerIcon class="message-icon" />
  </header>
  <main>
    <BookList 
      :books="props.books"
    />
  </main>
</div>
</template>

<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import MessagerIcon from '@/components/icons/MessagerIcon.vue'
import BookList from '@/components/MainPage/BookList.vue'

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  row-gap: 20px;
}

header {
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
        background: linear-gradient(60deg, #74699c 15%, #6eaf72, #fcba65, #db4d51 85%);
        filter: blur(3px);
        z-index: -1;
      }
    }
  }

  .message-icon {
    max-width: 50px;
  }
}
</style>