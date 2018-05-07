<template>
  <div class='progress-wrapper'>
    <div class="progress-bar" :style='{left: `-${100 - progress}%` }' />
  </div>
</template>
<script>
export default {
  name: "progress-bar",
  props: {
    progress: Number
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/colors.scss";
.progress-wrapper {
  width: 100%;
  height: 0.75rem;
  border-radius: 2px;
  border: 1px solid rgba($text, 0.5);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.progress-bar {
  position: absolute;
  left: -100%;
  height: 100%;
  width: 100%;
  background: $primary;
  transition: all 1s ease-in-out;
}
</style>
