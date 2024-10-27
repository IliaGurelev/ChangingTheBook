<template>
  <div class="popup">
    <div class="wrap">
      <p class="email">{{ props.user.email }}</p>
      <button @click="$emit('logout')" class="button-exit"><span>Выйти</span></button>
    </div>
    <Avatars class="avatar" :avatarID="2" />
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

.button-exit {
  max-width: 100px;
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

.avatar {
  width: 100px;
}
</style>