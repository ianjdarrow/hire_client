<template>
  <div class='container'>
    <div id='login'>
      <form @submit.prevent='handleSubmit'>
        <div class='input-container'>
          <i class="fa fa-envelope left" aria-hidden="true"></i>
          <input class='icon-left icon-right nolabel' type='email' placeholder='Email' v-model='email.value' @keydown='email.touched=true' />
        </div>
        <div class='input-container'>
          <input class='icon-left icon-right nolabel' type='password' placeholder='Password' v-model='password.value' @keydown='password.touched=true' />
          <i class="fa fa-lock left" aria-hidden="true"></i>
        </div>
        <button class='primary'>Log in</button>
      </form>
      <button class='small text has-text-grey'>Recover account</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { sendPostRequest } from "../utils";
export default {
  name: "login",
  data() {
    return {
      email: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      }
    };
  },
  methods: {
    handleSubmit: async function() {
      const payload = {
        email: this.email.value,
        password: this.password.value
      };
      try {
        const loginAttempt = await sendPostRequest("login", payload);
        // this.$store.commit("setUser", loginAttempt.data.user);
        this.$router.push("dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    ...mapGetters(["token"])
  }
};
</script>


<style lang="scss" scoped>
#login {
  max-width: 480px;
  margin: 0 auto;
  & button {
    width: 100%;
  }
}
</style>
