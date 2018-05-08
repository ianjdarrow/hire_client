<template>
  <transition name='flash'>
    <div class='flash-container' :class='`border-${flash.type}`' v-if='flash.active' @click='$store.commit("clearFlash")'>
      <span>{{ flash.message }}</span>
      <span class='close-button'>
        <i class="far fa-times-circle"></i>
      </span>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "flash",
  computed: mapState({
    flash: state => state.flash
  })
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
.flash-container {
  padding: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.45);
  cursor: pointer;
  margin-top: 3rem;
  width: 100%;
  height: 6.5rem;
  font-size: 1.2rem;
  transition: all 0.5s ease-in-out;
}
.close-button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  color: $grey;
  transition: color 0.2s ease;
  &:hover {
    color: white;
  }
}
.border-success {
  border: 2px solid $success;
}
.border-danger {
  border: 2px solid $danger;
}
.border-primary {
  border: 2px solid $primary;
}
.flash-leave-to {
  height: 0rem;
  margin-bottom: -3rem;
  opacity: 0;
}
</style>
