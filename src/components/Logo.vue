<template>
  <div id="page">
    <div id="container">
      <div id="ring"></div>
      <div id="ring"></div>
      <div id="ring"></div>
      <div id="ring"></div>
      <div id="h3">Меняю</div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
/* From Uiverse.io by dimasptrautmaa */ 
#page {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#h3 {
  font-family: "Unbounded", sans-serif;
  font-weight: bold;
  font-size: 100px;
  color: #db4d51;
  z-index: 1;
}

#ring {
  width: 300px;
  height: 300px;
  border: 10px solid transparent;
  border-radius: 50%;
  position: absolute;
}

#ring:nth-child(1) {
  border-bottom: 8px solid #8b7fb5;
  animation: rotate1 5s linear infinite;
}

@keyframes rotate1 {
  from {
    transform: rotateX(50deg) rotateZ(110deg);
  }

  to {
    transform: rotateX(50deg) rotateZ(470deg);
  }
}

#ring:nth-child(2) {
  border-bottom: 8px solid #eb5f5d;
  animation: rotate2 5s linear infinite;
}

@keyframes rotate2 {
  from {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
  }

  to {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
  }
}

#ring:nth-child(3) {
  border-bottom: 8px solid #4d6b8b;
  animation: rotate3 5s linear infinite;
}

@keyframes rotate3 {
  from {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
  }

  to {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
  }
}

#ring:nth-child(4) {
  border-bottom: 8px solid #f2b368;
  animation: rotate4 5s linear infinite;
}

@keyframes rotate4 {
  from {
    transform: rotateX(70deg) rotateZ(270deg);
  }

  to {
    transform: rotateX(70deg) rotateZ(630deg);
  }
}
</style>