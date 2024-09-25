<template>
  <header>
    <div class="search">
      <SearchIcon class="search__icon" />
      <input type="text" class="search__line" placeholder="Найти книгу" />
    </div>
    <button type="button" class="search__button">поиск</button>
    <MessagerIcon class="message-icon" />
  </header>
</template>

<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import MessagerIcon from '@/components/icons/MessagerIcon.vue'
</script>

<style scoped lang="scss">
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
      border: none;
      border-radius: 25px;
      font-size: 18px;
      font-weight: 800;
      color: white;
      padding: 10px 50px;
      background: transparent;
      text-align: center;
      overflow: hidden;
      z-index: 1;
      box-shadow: 0 5px 5px #c0383825;
      cursor: pointer;

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
  }
}
</style>
