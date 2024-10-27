<template>
  <div class="messager">
    <ul class="messages">
      <li 
        class="messages__item"
        v-for="message in props.messages" 
        :class="message.id_sender === props.userID ? 'messages__item--me' : ''"
        :key="message.id"
      >
        <div class="message">
          <p>{{ message.text }}</p>
        </div>
      </li>
    </ul>
    <div class="send-message">
      <input type="text" class="send-message__input" placeholder="Напишите сообщение...">
      <button class="send-message__button">
        <SendIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import SendIcon from '@/components/icons/SendIcon.vue';

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  userID: {
    type: Number,
    required: true,
  }
})
</script>

<style lang="scss" scoped>
.messager {
  position: relative;
  padding: 10px;
  background-repeat: repeat;
  background-image: url(../assets/BackgroundMessager.jpg);
  background-size: 360px 360px;
}

.messages {
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  &__item {
    
    &--me {
      margin-left: auto;

      .message {
        background-color: #8d81b5;
        color: #fbf8f5;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 20px;
        margin-left: auto;
      }
    }
  }
}

.message {
    display: inline-block;
    color: #765b52;
    background-color: #fbf8f5;
    padding: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

.send-message {
  position: absolute;
  display: flex;
  column-gap: 10px;
  bottom: 10px;
  left: 0px;
  width: 100%;
  padding: 0px 10px;

  &__input {
    width: 100%;
    padding: 15px;
    border-radius: 40px;
    background-color: #fbf8f5;
    color: #72564c;
  }

  &__button {
    width: 48px;
    height: 48px;
    padding: 10px;
    background: linear-gradient(to top, #db4d52, #f57173);
    border-radius: 50%;
    box-shadow: 0px 5px 10px #db4d528a;
  }
}
</style>