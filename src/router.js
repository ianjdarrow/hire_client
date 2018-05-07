import Vue from "vue";
import Router from "vue-router";
import axios from "axios";

import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import ConfirmSignup from "./views/ConfirmSignup.vue";
import ValidateSignup from "./views/ValidateSignup.vue";
import InitialSetup from "./views/InitialSetup.vue";
import CreateOfferLetter from "./views/CreateOfferLetter.vue";
import Dashboard from "./views/Dashboard.vue";

import store from "./store";
import { sendGetRequest } from "./utils";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup/confirm/:id",
      name: "validate-signup",
      component: ValidateSignup
    },
    {
      path: "/signup/confirm",
      name: "confirm-signup",
      component: ConfirmSignup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/dashboard/setup",
      name: "initial-setup",
      component: InitialSetup
    },
    {
      path: "/dashboard/create/offer-letter",
      name: "create-offer-letter",
      component: CreateOfferLetter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// authentication
router.beforeEach(async (to, from, next) => {
  // redirect not-logged-in users that attempt to hit auth routes
  // this is *separate* from server-side auth, of course
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user.token || window.localStorage.token) {
      const token = await sendGetRequest("check-token");
      if (token.status === 200) return next();
    }
    return next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }
  // catch state where user has registered but not confirmed
  if (
    store.state.user.email &&
    !store.state.user.hasRegistered &&
    to.path.indexOf("/signup/confirm") === -1
  ) {
    return next({
      path: "/signup/confirm"
    });
  }
  // don't let logged in users attempt to log in again
  if (to.path === "/login" || to.path === "/signup") {
    if (store.state.user.token || window.localStorage.token) {
      return next({ path: "/dashboard" });
    }
  }
  // unprotected routes
  return next();
});

export default router;
