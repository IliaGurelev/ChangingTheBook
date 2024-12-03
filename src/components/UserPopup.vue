<template>
  <div class="popup">
    <div class="wrap">
      <div class="flex-column">
        <p class="email">{{ props.user.name }}</p>
        <p class="email">{{ props.user.email }}</p>
      </div>
      <div class="flex-column">
        <button @click="$emit('my-books')" class="button button--my-books"><span>Мои объявления</span></button>
        <button @click="$emit('logout')" class="button"><span>Выйти</span></button>
      </div>
    </div>
    <Avatars class="avatar" :avatarID="props.user.avatar_id" />
  </div> 
</template>

<script setup>
import Avatars from '@/components/Avatars.vue'; 

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});
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

.button {
  font-size: 14px;
  font-weight: bold;
  color: #f66;
  background-color: #f8f0e4;
  border: #f66 solid 2px;
  border-radius: 2px;
  padding: 4px 10px;

  &:hover {
    span::after {
      width: 100%;
    }
  }

  &--my-books {
    color: rgb(102, 150, 255);
    border-color: rgb(102, 150, 255);

    span {
      &::after {
        background-color: rgb(102, 150, 255) !important;
      }
    }
  }

  span {
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      background-color: #f66;
      bottom: -1px;
      left: 0;
      transition: width 0.3s ease;
    }
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.avatar {
  width: 100px;
}
</style>