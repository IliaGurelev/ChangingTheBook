<template>
  <button>{{ props.text }}</button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: false,
  }
});
</script>

<style lang="scss" scoped>
button {
  outline: none;
  color: #f8f0e4;
  padding: 1px 45px;
  border: 2px dashed #f8f0e4;
  border-radius: 15px;
  background-color: #b86040;
  box-shadow: 0 0 0 4px #b86040, 2px 2px 4px 2px rgba(99, 99, 99, 0.5);
  transition: .1s ease-in-out, .4s color;
}

button:active {
  transform: translateX(0.1em) translateY(0.1em);
  box-shadow: 0 0 0 4px #f8f0e4, 1.5px 1.5px 2.5px 1.5px rgba(99, 99, 99, 0.5);
}
</style>