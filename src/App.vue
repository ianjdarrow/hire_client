<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

import { sendGetRequest } from "./utils";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  mounted() {
    this.$store.dispatch("checkLogin");
    //
    window.setInterval(() => {
      sendGetRequest("check-token");
    }, 1000 * 60 * 10);
  },
  beforeDestroy() {
    window.clearInterval(() => {
      sendGetRequest("check-token");
    }, 1000 * 60 * 10);
  }
};
</script>


<style lang="scss">
@import "../node_modules/normalize.css/normalize.css";
@import "./styles/main.scss";
</style>
