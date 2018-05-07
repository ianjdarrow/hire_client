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
          Generate an employee offer letter and related agreements using
          <router-link to='/dashboard/templates/offer-letter'>industry-leading documents</router-link>.
        </p>
        <button class='primary outlined margin-bottom margin-right'>Start from a previous offer&nbsp;
          <i class="fas fa-caret-right"></i>
        </button>
      </div>

      <!-- FORM FIELDS -->

      <div class='card-content'>
        <form>
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
            <input type='email' placeholder='employee@example.com'>
          </div>
          <div class='input-container'>
            <label>Title</label>
            <input type='text' placeholder='Senior Software Engineer'>
          </div>
          <hr>
          <div class='input-container'>
            <label></label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-offer-letter"
};
</script>

<style lang="scss" scoped>
.two-inputs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.two-inputs div {
  flex-basis: 48%;
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
</style>
