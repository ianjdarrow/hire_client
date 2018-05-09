<template>
  <div class='container'>
    <div class='action-container'>
      <!-- Main CTA buttons -->
      <div class='card action-card' @click='$router.push("/dashboard/create/offer-letter")'>
        <div class='card-content'>
          <h1 class='title'>
            <i class="fa fa-file-alt"></i>
          </h1>
          <span class='has-text-grey semibold'>Hire</span><br>
          <span class='heading bold'>Employee</span>
        </div>
      </div>
      <div class='card action-card'>
        <div class='card-content'>
          <h1 class='title'>
            <i class="fas fa-briefcase"></i>
          </h1>
          <span class='has-text-grey semibold'>Hire</span><br>
          <span class='heading bold'>Contractor</span>
        </div>
      </div>
      <div class='card action-card'>
        <div class='card-content'>
          <h1 class='title'>
            <i class="fas fa-file-archive"></i>
          </h1>
          <span class='has-text-grey semibold'>Send</span><br>
          <span class='heading bold'>NDA</span>
        </div>
      </div>
      <!-- Activity feeds -->
      <div class='activity-feeds'>
        <SavedOfferFeed title='Saved offers' url='pending-offers' />
      </div>
      <!-- Account settings, etc -->
      <div class='card action-card secondary' @click='$router.push("/dashboard/company")'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="fas fa-building"></i>
          </h1>
          <span class='semibold'>Company info</span>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="far fa-credit-card"></i>
          </h1>
          <span class='semibold'>Billing & Plan</span>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="fas fa-user-circle"></i>
          </h1>
          <span class='semibold'>Personal info</span>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="far fa-file"></i>
          </h1>
          <span class='semibold'>Templates</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SavedOfferFeed from "../components/SavedOfferFeed.vue";
export default {
  name: "dashboard",
  components: {
    SavedOfferFeed
  },
  async mounted() {
    await new Promise(res => setTimeout(res, 100));
    if (!this.user.companyId) {
      console.log(this.user);
      this.$router.push("/dashboard/setup");
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
.action-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.action-card {
  text-align: center;
  flex-basis: 31.2%;
  margin-bottom: 2rem;
  transition: all 0.15s ease-out;
  &:hover {
    background: $primary;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.13);
    // transform: translateY(-2px);
    // transform: scale(1.05);
    cursor: pointer;
  }
  @media (max-width: 600px) {
    flex-basis: 100%;
    margin-bottom: 0.5rem;
  }
  &.secondary {
    flex-basis: 22.5%;
    .card-content {
      padding-left: 0;
      padding-right: 0;
    }
    @media (max-width: 600px) {
      flex-basis: 48.5%;
    }
  }
}
.activity-feeds {
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
}
</style>
