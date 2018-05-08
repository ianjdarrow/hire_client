<template>
  <transition name='toast'>
    <div class='toast-container' v-if='toast.active' @click='handleToastClick'>
      <span>{{ toast.message }}</span>
    </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Toast",
  computed: mapState({
    toast: state => state.toast
  }),
  methods: {
    handleToastClick: function() {
      this.$store.commit("clearToast");
    }
  }
};
</script>
<style lang="scss" scoped>
.toast-container {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 360px;
  max-width: 70%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 4rem;
  padding: 2rem;
  border-radius: 5rem;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s;
}
.toast-leave-to {
  opacity: 0;
}
</style>
