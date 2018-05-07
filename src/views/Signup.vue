<template>
  <div class='container'>
    <div id='login'>
      <h3 class='heading has-text-centered'>Send beautiful documents in five minutes.</h3>
      <form @submit.prevent='handleSubmit'>
        <div class='input-container'>
          <i class="fa fa-envelope left" aria-hidden="true"></i>
          <i class="fa fa-check has-text-success right" aria-hidden="true" v-if='email.touched && email.valid'> </i>
          <input class='icon-left icon-right' type='email' placeholder='Email' v-model='email.value' autocorrect="off" autocapitalize="off" spellcheck="false" />
        </div>
        <div class='input-container'>
          <input class='icon-left icon-right' type='password' placeholder='Password' v-model='password.value' autocorrect="off" autocapitalize="off" spellcheck="false" />
          <i class="fa fa-lock left" aria-hidden="true"></i>
          <i class="fa fa-check has-text-success right" aria-hidden="true" v-if='password.touched && password.valid'> </i>
        </div>
        <button class='hero'>Create Account</button>
      </form>
      <button class='small text has-text-grey'>Log in</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { sendPostRequest } from "../utils";
export default {
  name: "signup",
  data() {
    return {
      email: {
        value: "",
        touched: false,
        valid: false
      },
      password: {
        value: "",
        touched: false,
        valid: false
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
        const user = await sendPostRequest("signup", payload);
        if (user.status === 200) {
          this.$router.push("/signup/confirm");
        }
      } catch (err) {
        console.log(err);
      }
    },
    validateEmail: function() {
      console.log("e");
      this.email.touched = true;
      this.email.valid = /(.+)@(.+){2,}\.(.+){2,}/.test(this.email.value);
    },
    validatePassword: function() {
      this.password.touched = true;
      this.password.valid = this.password.length > 7;
    },
    clearValidation: function() {}
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
