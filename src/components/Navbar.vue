<template>
  <div id="nav">
    <router-link to='/dashboard' class='fake-logo'>
      <span>Q</span>
    </router-link>
    <span class='menu-account' v-if='user.email' @click.prevent='$store.commit("logout")'>
      <router-link to='profile' class='link'>
        <i class="fa fa-user" aria-hidden="true"></i>
        &nbsp;{{ user.email }}
      </router-link>
    </span>
    <div class='menu-account' v-if='!user.email'>
      <router-link to='/login'>
        <button class='small text'>Log in</button>
      </router-link>
      <router-link to='/signup'>
        <button class='small primary outlined'>Sign up&nbsp;
          <i class="fa fa-caret-right" aria-hidden="true"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "navbar",
  computed: mapState({
    user: state => state.user
  })
};
</script>

<style lang="scss">
@import "../styles/colors.scss";
#nav {
  display: flex;
  padding: 0.25rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  background: $raise-color;
  position: absolute;
  top: 0;
  align-items: center;
  min-height: 3rem;
}
.fake-logo {
  color: white;
  font-weight: 600;
  text-decoration: none;
}
.menu-account {
  display: flex;
  align-items: center;
  margin-left: auto;
  & button {
    margin-bottom: 0;
    &:last-child {
      margin-left: 0.5rem;
    }
  }
}
</style>
