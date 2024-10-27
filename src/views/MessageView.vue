<template>
  <main>
    <MessagerRecipientList />
    <div class="chat">
      <div class="chat__info">
        <img class="chat__img" src="../assets/testBookImage.webp" alt="">
        <h1 class="chat__title">Сборник книг 1990-х годо Сборник книг 1990-х годовСборник книг 1990-х годовСборник книг 1990-х годовв</h1>
      </div>
      <Messager class="chat__messager" />
    </div>
  </main>
</template>

<script setup>
import Messager from '@/components/Messager.vue';
import MessagerRecipientList from '@/components/MessagerRecipientList.vue';
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
  display: flex;
  height: 100vh;
  column-gap: 20px;
}

.chat {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #eee5da;
  border-radius: 20px;
  padding: 10px;

  &__info {
    display: flex;
    column-gap: 10px;
    margin-bottom: 40px;
  }

  &__img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__title {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

    font-size: 40px;
    color: #65473e;
  }

  &__messager {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>