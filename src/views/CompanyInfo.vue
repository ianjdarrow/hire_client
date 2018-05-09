<template>
  <div class='container setup-container'>
    <!-- COMPANY FORM -->

    <div class='card setup-step'>
      <div class='card-title'>
        <span class='link has-text-small has-text-grey' @click='$router.push("/dashboard")'>
          <i class="fa fa-caret-left" aria-hidden="true"></i>
          &nbsp;Dashboard
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
              <select v-model='form.stateFull'>
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
            Save&nbsp;
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { sendGetRequest, sendPostRequest, states } from "../utils";
import { mapState } from "vuex";

export default {
  name: "company-info",
  data() {
    return {
      form: {
        companyName: "",
        stateFull: "Delaware",
        entityType: "Corporation",
        hasStockPlan: null,
        stockPlanName: "",
        logo: ""
      },
      loading: true
    };
  },
  async mounted() {
    const company = await sendGetRequest("company-info");
    this.loading = false;
    this.form = company.data;
  },
  computed: {
    states: () => states,
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
      const company = await sendPostRequest("company-info", this.form);
      if (company.status === 200) {
        this.$store.commit("setToast", "Company info updated!");
        this.$router.push("/dashboard");
      } else {
        this.$store.commit("setFlash", {
          type: "danger",
          message: "Error updating company"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$setup-container-width: 640px;
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
