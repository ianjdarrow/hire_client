<template>
  <div class='container setup-container'>
    <ProgressBar :progress='progress' class='progress' />
    <transition name='setup'>

      <!-- landing -->

      <div v-if='step === "intro"' key='intro' class='card setup-step'>
        <div class='card-title'>
          <h3 class='heading'>
            <i class="fa fa-check has-text-success" aria-hidden="true"></i>
            Account confirmed!
          </h3>
        </div>
        <div class='card-content'>
          <p>One last thing: let's get some basic info about you and your company.</p>
          <p>Filling out the same form over and over is silly. We'll automatically include the right data in your documents, forever.</p>
          <button class='outlined standalone fullwidth' @click='handleIntroSubmit'>
            Add info&nbsp;
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- personal info -->

      <div v-if='step === "user_info"' key='user_info' class='card setup-step'>
        <div class='card-title'>
          <h3 class='heading'>
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            &nbsp;You
          </h3>
        </div>
        <div class='card-content'>
          <form @submit.prevent='handleUserSubmit'>
            <div class='input-container'>
              <label>Full name</label>
              <input placeholder='Jack Donaghy' v-model='form.name'>
            </div>
            <div class='input-container'>
              <label>Title</label>
              <input placeholder='Chief Executive Officer' v-model='form.title'>
            </div>
            <button type='submit' class='outlined standalone fullwidth grey' :disabled='userSubmitDisabled'>
              Next: Your company&nbsp;
              <i class="fa fa-caret-right" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- COMPANY FORM -->

      <div v-if='step === "company_info"' key='company_info' class='card setup-step'>
        <div class='card-title'>
          <span class='link has-text-small has-text-grey' @click.prevent='handleIntroSubmit'>
            <i class="fa fa-caret-left" aria-hidden="true"></i>
            &nbsp;Previous: You
          </span>
          <h3 class='heading'>
            <i class="fa fa-building" aria-hidden="true"></i>
            &nbsp;Your company
          </h3>
        </div>
        <div class='card-content'>
          <form @submit.prevent='handleCompanySubmit'>
            <!-- Company name -->
            <div class='input-container'>
              <label>Legal name</label>
              <input placeholder='Acme Widgets Inc.' v-model='form.companyName'>
            </div>
            <!-- State of formation -->
            <div class='input-container'>
              <label>State of Formation</label>
              <div class='select'>
                <select v-model='form.state'>
                  <option v-for='state in states' :key='state.name' :value='state.name'>
                    {{ state.name}}
                  </option>
                </select>
              </div>
            </div>
            <!-- Entity type -->
            <div class='input-container'>
              <label>Entity type</label>
              <div class='select'>
                <select v-model='form.entityType'>
                  <option value='Corporation'>Corporation</option>
                  <option value='Limited liability company'>Limited liability company</option>
                  <option value='Limited partnership'>Limited partnership</option>
                  <option value='General partnership'>General partnership</option>
                </select>
              </div>
            </div>
            <!-- Equity -->
            <div class='equity-questions'>
              <button type='button' :class='[form.hasStockPlan === "yes" ? "success" : "", "equity-button outlined"]' @click.prevent='form.hasStockPlan="yes"'>
                We issue equity to employees
              </button>
              <button type='button' :class='[form.hasStockPlan === "no" ? "danger" : "", "equity-button outlined"]' @click.prevent='form.hasStockPlan="no"'>
                We don't
              </button>
            </div>
            <transition name='stock-plan'>
              <div v-if='form.hasStockPlan ==="yes"' class='input-container'>
                <label>Equity plan name</label>
                <input placeholder='2018 Equity Incentive Plan' v-model='form.stockPlanName'>
              </div>
            </transition>
            <hr>
            <div class='logo-preview' v-if='this.form.logo'>
              <img :src='this.form.logo' />
            </div>
            <div class='upload'>
              <button type='button' class='outlined fullwidth margin-bottom'>Upload a logo (optional)</button>
              <input type='file' @change='handleFileUpload'>
            </div>
            <hr>
            <button :disabled='companySubmitDisabled' type='submit' class='hero fullwidth'>
              Finish setup&nbsp;
              <i class="fa fa-caret-right" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ProgressBar from "../components/ProgressBar.vue";

import { sendPostRequest, states } from "../utils";
import { mapState } from "vuex";

export default {
  name: "initial-setup",
  components: {
    ProgressBar
  },
  data() {
    return {
      form: {
        name: "",
        title: "",
        companyName: "",
        state: "Delaware",
        entityType: "Corporation",
        hasStockPlan: null,
        stockPlanName: "",
        logo: ""
      },
      loading: false
    };
  },
  computed: {
    states: () => states,
    step: function() {
      return this.$route.query.step || "intro";
    },
    progress: function() {
      switch (this.step) {
        case "user_info":
          return 72;
          break;
        case "company_info":
          return 90;
          break;
        default:
          return 55;
          break;
      }
    },
    userSubmitDisabled: function() {
      return (
        this.form.name.length < 1 || this.form.title.length < 1 || this.loading
      );
    },
    companySubmitDisabled: function() {
      return (
        this.form.companyName.length < 1 ||
        this.form.hasStockPlan === null ||
        (this.form.hasStockPlan === "yes" &&
          this.form.stockPlanName.length < 1) ||
        this.loading
      );
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    handleIntroSubmit: function() {
      this.$router.push({
        path: this.$route.path,
        query: {
          step: "user_info"
        }
      });
    },
    handleUserSubmit: async function() {
      this.loading = true;
      const submitUser = await sendPostRequest("user", {
        name: this.form.name,
        title: this.form.title
      });
      this.loading = false;
      this.$router.push({
        path: this.$route.path,
        query: {
          step: "company_info"
        }
      });
    },
    handleFileUpload: function(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (reader.result.indexOf("data:image/") !== -1) {
          this.form.logo = reader.result;
        } else {
          this.$store.commit("setFlash", {
            type: "danger",
            message: "Logos can only be .gif, .svg, .png or .jpg!"
          });
        }
      });
      reader.readAsDataURL(file);
    },
    handleCompanySubmit: async function() {
      console.log("let's submit a form");
      const payload = {
        companyName: this.form.companyName,
        entityType: this.form.entityType,
        state: this.form.state,
        hasStockPlan: this.form.hasStockPlan,
        stockPlanName: this.form.stockPlanName,
        logo: this.form.logo
      };
      const company = await sendPostRequest("create-company", payload);
      if (company.status === 200) {
        this.$store.commit("setFlash", {
          type: "success",
          message: "Initial setup complete!"
        });
        this.$router.push("/dashboard");
      } else {
        this.$store.commit("setFlash", {
          type: "danger",
          message: "Error setting up company."
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$setup-container-width: 640px;
.progress {
  max-width: $setup-container-width;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-bottom: none;
}
.setup-container {
  margin-bottom: 1280px;
}
.equity-questions {
  display: flex;
}
.equity-button {
  flex-basis: 50%;
  margin-bottom: 1rem;
  &:first-child {
    margin-right: 0.5rem;
  }
  &:last-child {
    margin-left: 0.5rem;
  }
}
.setup-step {
  position: absolute;
  box-sizing: border-box;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  max-width: $setup-container-width;
}
.logo-preview {
  margin-bottom: 1rem;
  img {
    display: block;
    padding: 1rem;
    margin: 0 auto;
    max-width: 300px;
    height: auto;
  }
}
.setup-enter-active,
.setup-leave-active {
  transition: all 0.5s ease;
}
.setup-enter {
  transform: translateX(120vw);
}
.setup-leave-to {
  transform: translateX(-120vw);
}
.stock-plan-enter-active,
.stock-plan-leave-active {
  transition: all 0.15s ease-in-out;
  height: 3.5em;
}
.stock-plan-enter,
.stock-plan-leave-to {
  height: 0;
  opacity: 0;
}
</style>
