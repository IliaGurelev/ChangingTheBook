<template>
  <ul class="recipients">
      <li>
        <MessagerRecipient />
      </li>
      <li>
        <MessagerRecipient :selected="true" />
      </li>
  </ul>
</template>

<script setup>
import MessagerRecipient from '@/components/MessagerRecipient.vue';

const props = defineProps({
  
})
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