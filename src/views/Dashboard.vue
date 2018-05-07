<template>
  <div class='container'>
    <div class='action-container'>
      <div class='card action-card'>
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
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="fas fa-building"></i>
          </h1>
          <span class='semibold'>Company</span><br>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="fas fa-user-circle"></i>
          </h1>
          <span class='semibold'>User</span><br>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="fas fa-building"></i>
          </h1>
          <span class='semibold'>Company</span><br>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="far fa-credit-card"></i>
          </h1>
          <span class='semibold'>Subscription</span><br>
        </div>
      </div>
      <div class='card action-card secondary'>
        <div class='card-content'>
          <h1 class='subtitle'>
            <i class="far fa-file"></i>
          </h1>
          <span class='semibold'>Templates</span><br>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "dashboard",
  mounted() {
    setTimeout(() => {
      if (!this.user.companyId) {
        console.log(this.user);
        this.$router.push("/dashboard/setup");
      }
    }, 500);
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
};
</script>

<style lang="scss" scoped>
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
  position: relative;
  &:hover {
    background: rgba(255, 255, 255, 0.13);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.13);
    // transform: translateY(-2px);
    transform: scale(1.05);
    cursor: pointer;
  }
  @media (max-width: 600px) {
    flex-basis: 100%;
    margin-bottom: 0.5rem;
  }
  &.secondary {
    flex-basis: 17.5%;
    @media (max-width: 600px) {
      flex-basis: 48.5%;
    }
  }
}
</style>
