<template>
  <main>
    <MessagerRecipientList 
      @updateSelected="selectMessager"
      :recipients="recipietns"
      :selectedDefault="selectedMessagerID"
    />
    <div class="chat">
      <div class="chat__info">
        <div>
          <Avatars class="chat__img" :avatarID="selectedMessager?.avatar_id || 0" />
          <h2 class="chat__title">{{selectedMessager?.name || 'Чат'}}</h2>
        </div>
        <RouterLink to="/">
          <LogoStatic class="logo" />
        </RouterLink>
      </div>
      <Messager class="chat__messager"
        :messages="messages"
        :userID="Number(userID)"
        @send-message="clickSend"
      />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';

import Messager from '@/components/Messager.vue';
import MessagerRecipientList from '@/components/MessagerRecipientList.vue';
import Avatars from '@/components/Avatars.vue';
import LogoStatic from '@/components/LogoMini.vue';

import { fetchMessagers, fetchMessages, sendMessage } from '@/apiService';

const recipietns = ref([]);
const selectedMessagerID = ref(1);
const userID = ref('');  
const messages = ref([]);

const selectedMessager = computed(() => {
  return recipietns.value.find(recipient => recipient.id === selectedMessagerID.value)
})

async function clickSend(text) {
  if(text != "") {
    const message = await sendMessage(selectedMessagerID.value, userID.value, text);
    if(message) {
      messages.value.push({
        id_messager: selectedMessagerID.value,
        id_sender: Number(userID.value),
        text: text
      });
    }
  }
}

async function loadRecipients() {
  recipietns.value = await fetchMessagers(userID.value);
  recipietns.value = recipietns.value.map(recipient => {
    if (recipient.id_owner === userID.value) {
      return {
        id: recipient.id,
        id_recipient: recipient.id_buyer,
        name: recipient.name_buyer,
        avatar_id: recipient.avatar_buyer
      };
    } else if (recipient.id_buyer === userID.value) {
      return {
        id: recipient.id,
        id_recipient: recipient.id_owner,
        name: recipient.name_owner,
        avatar_id: recipient.avatar_owner
      };
    }
    return null;
  }).filter(Boolean);
  selectedMessagerID.value = recipietns.value[0].id;
}

async function selectMessager(idMessager) {
  selectedMessagerID.value = idMessager;
}

onMounted(() => {
  userID.value = Number(localStorage.getItem('userID'));
  loadRecipients();
})

watchEffect(async () => {
  messages.value = await fetchMessages(selectedMessagerID.value);
})
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
    justify-content: space-between;
    column-gap: 10px;
    margin-bottom: 40px;

    div {
      display: flex;
    }
  }

  &__img {
    width: 80px;
    height: 80px;
    object-fit: contain;
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