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
            <label>Full name</label>
            <input placeholder='Jack Donaghy' v-model='form.name'>
            <label>Title</label>
            <input placeholder='Chief Executive Officer' v-model='form.title'>
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
          <a class='link has-text-small has-text-grey' @click.prevent='handleIntroSubmit'>
            <i class="fa fa-caret-left" aria-hidden="true"></i>
            &nbsp;Previous: You
          </a>
          <h3 class='heading'>
            <i class="fa fa-building" aria-hidden="true"></i>
            &nbsp;Your company
          </h3>
        </div>
        <div class='card-content'>
          <form @submit.prevent='handleCompanySubmit'>
            <!-- Company name -->
            <label>Legal name</label>
            <input placeholder='Acme Widgets Inc.' v-model='form.companyName'>
            <!-- State of formation -->
            <label>State of Formation</label>
            <div class='select'>
              <select v-model='form.state'>
                <option v-for='state in states' :key='state.name' :value='state.name'>
                  {{ state.name}}
                </option>
              </select>
            </div>
            <!-- Entity type -->
            <label>Entity type</label>
            <div class='select'>
              <select v-model='form.entityType'>
                <option value='Corporation'>Corporation</option>
                <option value='Limited liability company'>Limited liability company</option>
                <option value='Limited partnership'>Limited partnership</option>
                <option value='General partnership'>General partnership</option>
              </select>
            </div>
            <!-- Equity -->
            <div class='equity-questions'>
              <button type='button' :class='[form.hasStockPlan === "yes" ? "success" : "", "small equity-button outlined"]' @click.prevent='form.hasStockPlan="yes"'>
                We issue equity to employees
              </button>
              <button type='button' :class='[form.hasStockPlan === "no" ? "danger" : "", "small equity-button outlined"]' @click.prevent='form.hasStockPlan="no"'>
                We don't
              </button>
            </div>
            <transition name='stock-plan'>
              <div v-if='form.hasStockPlan ==="yes"'>
                <label>Equity plan name</label>
                <input placeholder='2018 Equity Incentive Plan' v-model='form.stockPlanName'>
              </div>
            </transition>
            <button :disabled='companySubmitDisabled' type='submit' class='hero standalone fullwidth'>
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
      console.log(company);
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
  // position: relative;
  margin-bottom: 800px;
}
// .breadcrumb {
//   position: relative;
//   // transform: translate(-1rem, -0.75rem);
// }
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
  // margin-top: 30px;
  width: 100%;
  max-width: $setup-container-width;
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
  transition: all 0.3s ease;
  height: 5em;
}
.stock-plan-enter,
.stock-plan-leave-to {
  height: 0;
  opacity: 0;
}
</style>
