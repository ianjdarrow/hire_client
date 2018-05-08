<template>
  <div class='container' :key='$route.fullPath'>
    <div class='card'>
      <div class='card-title'>
        <p>
          <router-link to='/dashboard' class='link has-text-grey has-text-small'>
            <i class="fas fa-caret-left"></i>
            Dashboard
          </router-link>
        </p>
        <span class='heading'>
          <i class="fa fa-file-alt"></i>
          &nbsp;Employee offer letter
        </span>
        <p>
          Create and send beautiful hiring packages with
          <router-link to='/dashboard/templates/offer-letter'>industry-best documents</router-link> in minutes.
        </p>
        <button class='primary margin-bottom margin-right'>Start from a previous offer&nbsp;
          <i class="fas fa-caret-right"></i>
        </button>
      </div>

      <!-- FORM FIELDS -->

      <div class='card-content' ref='content'>
        <form @submit.prevent='handleFormSubmit'>
          <!-- Employee stuff -->
          <span class='subheading'>Employee info</span><br><br>
          <div class='two-inputs'>
            <div class='input-container'>
              <label>First name</label>
              <input type='text' placeholder='Peter' v-model='form.firstName'>
            </div>
            <div class='input-container'>
              <label>Last name</label>
              <input placeholder='Gibbons' v-model='form.lastName'>
            </div>
          </div>
          <div class='input-container'>
            <label>Email</label>
            <input type='email' placeholder='peter@example.com' v-model='form.email'>
          </div>
          <!-- Position stuff -->
          <span class='subheading'>Position</span><br><br>
          <div class='input-container'>
            <label>Title</label>
            <input type='text' placeholder='Senior Software Engineer' v-model='form.jobTitle'>
          </div>
          <div class='two-inputs'>
            <div class='input-container'>
              <label>Pay</label>
              <input type='number' class='icon-left' lang='en-150' placeholder='100,000' v-model='form.payRate'>
              <!-- <i class="fas fa-dollar-sign static-icon"></i> -->
              <span class="static-icon">$</span>
            </div>
            <div class='input-container'>
              <label>per</label>
              <div class='select'>
                <select v-model='form.payUnit'>
                  <option value='year'>Year</option>
                  <option value='hour'>Hour</option>
                </select>
              </div>
            </div>
          </div>
          <div class='binary-question'>
            <button type='button' :class='[form.fulltime === "yes" ? "success" : "", "outlined margin-right equity-button"]' @click.prevent='form.fulltime="yes"'>
              Full-time
            </button>
            <button type='button' :class='[form.fulltime === "no" ? "danger" : "", "outlined equity-button"]' @click.prevent='form.fulltime="no"'>
              Part-time
            </button>
            <div class='binary-button'>OR</div>
          </div>
          <div class='binary-question'>
            <button type='button' :class='[form.hasBenefits === "yes" ? "success" : "", "outlined margin-right equity-button"]' @click.prevent='form.hasBenefits="yes"'>
              Benefits
            </button>
            <button type='button' :class='[form.hasBenefits === "no" ? "danger" : "", "outlined equity-button"]' @click.prevent='form.hasBenefits="no"'>
              No benefits
            </button>
            <div class='binary-button'>OR</div>
          </div>
          <div class='binary-question'>
            <button type='button' :class='[form.equityGrant === "yes" ? "success" : "", "outlined margin-right equity-button"]' @click.prevent='form.equityGrant="yes"'>
              Include Equity Grant
            </button>
            <button type='button' :class='[form.equityGrant === "no" ? "danger" : "", "outlined equity-button"]' @click.prevent='form.equityGrant="no"'>
              No equity
            </button>
            <div class='binary-button'>OR</div>
          </div>
          <transition name='has-grant'>
            <div v-if='form.equityGrant === "yes"'>
              <h3 class='subheading'>Equity details</h3><br>
              <div class='two-inputs'>
                <div class='input-container'>
                  <label>Amount</label>
                  <input placeholder='100,000' type='number' v-model='form.equityAmount'>
                </div>
                <div class='input-container'>
                  <label>Grant type</label>
                  <div class='select'>
                    <select v-model='form.equityType'>
                      <option value='option'>Options</option>
                      <option value='restricted stock'>Restricted stock</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class='input-container'>
                <label>Vesting schedule</label>
                <div class='select'>
                  <select v-model='form.vesting'>
                    <option value='standard'>Standard (4 years, 1 year cliff)</option>
                    <option value='4/none/monthly'>4 years, no cliff</option>
                    <option value='2/1/monthly'>2 years, 1 year cliff</option>
                    <option value='2/none/monthly'>2 years, no cliff</option>
                    <option value='1/none/monthly'>1 year, no cliff</option>
                  </select>
                </div>
              </div>
            </div>
          </transition>
          <!-- Supervisor info -->
          <h3 class='subheading'>Supervisor info</h3><br>
          <div class='input-container'>
            <label>Full name</label>
            <input type='text' placeholder='Bill Lumbergh' v-model='form.supervisorName'>
          </div>
          <div class='input-container'>
            <label>Title</label>
            <input type='text' placeholder='Chief Technology Officer' v-model='form.supervisorTitle'>
          </div>
          <div class='input-container'>
            <label>Email</label>
            <input type='email' placeholder='bill@your-company.com' v-model='form.supervisorEmail'>
          </div>
          <!-- Logistics -->
          <hr>
          <div class='two-inputs'>
            <div class='input-container'>
              <label>Start date</label>
              <input type='date' v-model='form.startDate'>
            </div>
            <div class='input-container'>
              <label>Respond by</label>
              <input type='date' v-model='form.respondBy'>
            </div>
          </div>
          <hr>
          <button type='submit' class='hero fullwidth'>Preview offer letter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getPrefillDate, sendGetRequest, sendPostRequest } from "../utils";
export default {
  name: "create-offer-letter",
  data() {
    return {
      form: {
        previewURL: "",
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        payUnit: "year",
        payRate: null,
        equityType: "option",
        equityGrant: null,
        equityAmount: null,
        vesting: "standard",
        fulltime: "yes",
        hasBenefits: "yes",
        supervisorName: "",
        supervisorTitle: "",
        supervisorEmail: "",
        respondBy: null,
        startDate: null
      }
    };
  },
  methods: {
    handleFormSubmit: async function() {
      console.log("submit");
      this.submitFormData();
    },
    submitFormData: async function() {
      this.$store.commit("setToast", "Submitted");
      const update = await sendPostRequest("update-offer-letter", {
        form: this.form
      });
      console.log(update);
    }
  },
  async mounted() {
    this.form.respondBy = getPrefillDate(14);
    this.form.startDate = getPrefillDate(21);
    const previewURL = this.$route.query.id;
    if (previewURL) {
      this.form.previewURL = previewURL;
      const document = await sendGetRequest(`offer-letter/${previewURL}`);
      if (document.status == 200) {
        this.form = document.data;
        this.$refs.content.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        return;
      } else {
        this.$store.commit("setFlash", {
          type: "danger",
          message:
            "We couldn't find that offer letter. Let's start you with a fresh one."
        });
      }
    }
    // we only get here if there was no documentId, or if there was one but it
    // was bad
    const initialize = await sendGetRequest("initialize-offer-letter");
    this.$router.replace({
      path: "/dashboard/create/offer-letter",
      query: {
        id: initialize.data.previewURL
      }
    });
    this.form.previewURL = initialize.data.previewURL;
    this.submitFormData();
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
.two-inputs {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  @media (max-width: 750px) {
    flex-wrap: wrap;
  }
}
.two-inputs div {
  flex-basis: 50%;
  &:first-child {
    margin-right: 1rem;
  }
  @media (max-width: 750px) {
    flex-basis: 100%;
    &:first-child {
      margin-right: 0;
    }
  }
}
.binary-question {
  display: flex;
  position: relative;
  width: 100%;
}
.binary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0.5rem;
  width: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -67%);
  color: $grey;
  border: 0;
  cursor: default;
}
.equity-button {
  margin-bottom: 1rem;
  flex-basis: 50%;
  &:first-child {
    margin-right: 3rem;
  }
}
.has-grant-enter-active,
.has-grant-leave-active {
  transition: all 0.33s ease-in-out;
  height: 15em;
}
.has-grant-enter,
.has-grant-leave-to {
  height: 0;
  opacity: 0;
}
</style>
