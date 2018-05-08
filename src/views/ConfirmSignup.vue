<template>
  <div class='container has-text-centered'>
    <div class='circle-icon'>
      <h1 class='title'>
        <i class="fa fa-envelope nudge" aria-hidden="true"></i>
      </h1>
    </div>
    <h3 class='heading'>Check
      <span class='bold'>{{ user.email }}</span> for your confirmation link.
    </h3>
    <div class='helper'>
      <button class='outline' @click='resendConfirmation'>
        Resend link&nbsp;
        <i class="fa fa-caret-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { sendGetRequest } from "../utils";
export default {
  name: "confirm-signup",
  methods: {
    resendConfirmation: async function() {
      const req = await sendGetRequest("send-registration-link");
      console.log(req.data);
    }
  },
  computed: mapState({
    user: state => state.user
  })
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
.circle-icon {
  @include primary-gradient;
  padding: 1rem;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.nudge {
  position: relative;
  transform: translateY(0.3rem);
}
.helper {
  margin-top: 4rem;
}
</style>
