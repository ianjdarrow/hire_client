<template>
  <div class='container'>
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
          Generate and send beautiful hiring packages with
          <router-link to='/dashboard/templates/offer-letter'>industry-leading documents</router-link> in minutes.
        </p>
        <button class='primary margin-bottom margin-right'>Start from a previous offer&nbsp;
          <i class="fas fa-caret-right"></i>
        </button>
      </div>

      <!-- FORM FIELDS -->

      <div class='card-content'>
        <form @submit.prevent='handleFormSubmit'>
          <!-- Employee stuff -->
          <span class='subheading'>Employee info</span><br><br>
          <div class='two-inputs'>
            <div class='input-container'>
              <label>First name</label>
              <input type='text' placeholder='Peter'>
            </div>
            <div class='input-container'>
              <label>Last name</label>
              <input placeholder='Gibbons'>
            </div>
          </div>
          <div class='input-container'>
            <label>Email</label>
            <input type='email' placeholder='peter@example.com'>
          </div>
          <!-- Position stuff -->
          <span class='subheading'>Position</span><br><br>
          <div class='input-container'>
            <label>Title</label>
            <input type='text' placeholder='Senior Software Engineer'>
          </div>
          <div class='two-inputs'>
            <div class='input-container'>
              <label>Pay</label>
              <input type='number' class='icon-left' lang='en-150' placeholder='100,000'>
              <!-- <i class="fas fa-dollar-sign static-icon"></i> -->
              <span class="static-icon">$</span>
            </div>
            <div class='input-container'>
              <label>per</label>
              <div class='select'>
                <select>
                  <option>Year</option>
                  <option>Hour</option>
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
                    <select>
                      <option>Options</option>
                      <option>Restricted stock</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class='input-container'>
                <label>Vesting schedule</label>
                <div class='select'>
                  <select>
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
            <input type='text' placeholder='Bill Lumbergh'>
          </div>
          <div class='input-container'>
            <label>Title</label>
            <input type='text' placeholder='Chief Technology Officer'>
          </div>
          <div class='input-container'>
            <label>Email</label>
            <input type='email' placeholder='bill@your-company.com'>
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
          <button class='hero fullwidth'>Preview offer letter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getPrefillDate } from "../utils";
export default {
  name: "create-offer-letter",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        payUnit: "year",
        payRate: "",
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
      console.log("submitted yo");
    }
  },
  mounted() {
    this.form.respondBy = getPrefillDate(14);
    this.form.startDate = getPrefillDate(21);
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
  transform: translate(-50%, -75%);
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
