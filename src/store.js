import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import router from "./router";
import { sendGetRequest } from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loading: true,
    toast: {
      active: false,
      message: ""
    },
    flash: {
      active: false,
      type: "",
      message: ""
    },
    toast: {
      active: false,
      message: ""
    }
  },
  mutations: {
    setUser(state, user) {
      this.state.user = user;
      window.localStorage.token = user.token;
    },
    logout(state) {
      state.user = {};
      window.localStorage.removeItem("token");
      router.push("/login");
    },
    setFlash(state, flash) {
      state.flash = {
        active: true,
        ...flash
      };
    },
    clearFlash(state) {
      state.flash = {
        active: false,
        type: "",
        message: ""
      };
    },
    setToast(state, message) {
      state.toast = {
        active: true,
        message
      };
      setTimeout(() => this.commit("clearToast"), 3500);
    },
    clearToast(state) {
      state.toast = {
        active: false,
        message: ""
      };
    },
    disableLoading: state => (state.loading = false)
  },
  getters: {
    token: state => {
      const token = state.user.token || window.localStorage.token;
      return token || undefined;
    }
  },
  actions: {
    async checkLogin({ commit }) {
      const token = this.getters.token;
      if (token) {
        const req = await sendGetRequest("check-token");
        if (!req.data) {
          return commit("logout");
        }
        if (!this.state.user.hasRegistered) {
          router.push("/signup/confirm");
        }
      }
    }
  }
});
