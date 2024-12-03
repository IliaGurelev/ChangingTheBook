<template>
  <header>
    <RouterLink to="/">
      <Logo />
    </RouterLink>
  </header>
  <div class="login-form">
    <h1 class="title">Регистрация</h1>
    <p class= "message">{{ message }}</p>
    <div class="input-wrap">
      <label class="label" for="email">Почта</label>
      <input v-model="email" class="input" type="text" id="email">
    </div>
    <div class="input-wrap">
      <label class="label" for="name">Имя</label>
      <input v-model="nameUser" class="input" type="text" id="name">
    </div>
    <div class="input-wrap">
      <label class="label" for="password">Пароль</label>
      <input v-model="password" class="input" type="text" id="password">
    </div>
    <RouterLink to="/login">Вход</RouterLink>
    <button class="button" @click="clickLogin">Зарегистрироваться</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import Logo from '@/components/Logo.vue';
import { registerUser } from '@/apiService';

const email = ref('');
const password = ref('');
const nameUser = ref('');
const message = ref('');

const router = useRouter();

async function clickLogin() {
  const randomAvatar = Math.floor(Math.random() * 10) + 1;
  const response = await registerUser(email.value, password.value, nameUser.value, randomAvatar);

  if(response.success){
    localStorage.setItem('userID', response.userId);
    router.push({path: '/'})
  } else {
    message.value = response.message;
  }
}
</script>

<style lang="scss" scoped>
header {
  margin-top: 100px;
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  max-width: 500px;
  padding: 20px;
  background-color: #e2d6c9;
  border-radius: 20px;
  box-shadow: 0 0 0 15px #e2d6c9;
  border: 2px dashed #64463c;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #64463c;
}

.message {
  color: #db4d51;
}

.input-wrap {
  display: flex;
  flex-direction: column;
}

.input {
  max-width: 700px;
  width: 400px;
  padding: 5px;
  background-color: rgb(251, 248, 245);
  border-radius: 5px;
  font-size: 20px;
}

.label {
  color: #64463c;
  font-weight: bold;
}

.button {
  position: relative;
  display: inline-block;
  max-width: 350px;
  width: 100%;
  border: none;
  border-radius: 25px;
  box-shadow: 0 5px 5px #c0383825;
  color: white;
  font-size: 24px;
  font-weight: 800;
  padding: 20px 20px;
  background: #db4d51;
  overflow: hidden;
  cursor: pointer;
}

.decor {
  position: absolute;

  &--left {
    top: 0;
    left: 0;
  }
}
</style>