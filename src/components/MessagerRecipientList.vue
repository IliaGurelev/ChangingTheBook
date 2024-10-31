<template>
  <ul class="recipients">
      <li v-for="recipient in props.recipients" :key="recipient.id">
        <MessagerRecipient 
          @click="changeSelectedRecipient(recipient.id)"
          :selected="isSelectedRecipient(recipient.id)"
          :name="recipient.name"
          :previewImage="recipient.avatar_id"
        />
      </li>
  </ul>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

import MessagerRecipient from '@/components/MessagerRecipient.vue';

const props = defineProps({
  recipients: {
    type: Array,
    required: true,
  },
  selectedDefault: {
    type: Number,
    required: false,
    default: 0,
  }
})

const emit = defineEmits(['updateSelected'])

const selectedRecipientID = ref(props.selectedRecipient);

function changeSelectedRecipient(id) {
  selectedRecipientID.value = id;
  emit('updateSelected', id);
}

function isSelectedRecipient(id) {
  return selectedRecipientID.value === id; 
}
</script>

<style lang="scss" scoped>
.recipients {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 20px;
  background-color: #eee5da;
}
</style>