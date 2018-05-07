<template>
  <div></div>
</template>
<script>
import { sendGetRequest } from "../utils";
export default {
  name: "validate-signup",
  async mounted() {
    const id = this.$route.params.id;
    const confirm = await sendGetRequest(`confirm-registration/${id}`);
    if (confirm.status !== 200) {
      this.$router.push("/login");
      console.log("Invalid registration token");
    }
    this.$router.push("/dashboard");
  }
};
</script>
