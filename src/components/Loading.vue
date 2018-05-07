<template>
  <div class='spinner-container'>
    <div class='spinner'></div>
  </div>
</template>


<style lang="scss" scoped>
.spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 1px solid #f6f;
  border-top-color: #0e0;
  border-right-color: #0dd;
  border-bottom-color: #f90;
  animation: spinner 0.6s linear infinite;
}
</style>
