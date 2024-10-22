<template>
  <div class="popup">
    <div class="wrap">
      <p class="email">{{ user.mail }}</p>
      <button class="button-exit">Выйти</button>
    </div>
    <img class="avatar" src="@/assets/avatar1.png" alt="">
  </div>
</template>

<script setup>
import UserIcon from '@/components/UserButton.vue';

const user = {
  avatarId: 1,
  mail: "vailade.you@bk.ru",
}
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 40px;
  background-color: #f8f0e4;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(136, 136, 136, 0.274);
}

.wrap {
  display: flex;
  height: 100%;
  flex-direction:  column;
  row-gap: 80px;
}

.button-exit {
  max-width: 100px;
  font-size: 14px;
  font-weight: bold;
  color: #f66;
  background-color: #fbf8f5;
  border: #f66 solid 2px;
  border-radius: 2px;
  padding: 4px 10px;
}

.avatar {
  width: 100px;
}
</style>