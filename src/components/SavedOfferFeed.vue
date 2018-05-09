<template>
  <div class='card outlined activity-container'>
    <div class='card-title outlined'>
      <i class="far fa-save"></i>&nbsp;&nbsp;Saved documents
    </div>
    <div class='card-content' v-if='items.length > 0'>
      <transition-group name='documents'>
        <div v-for='item in items' :key='item.id' class='item-wrapper' @click='goToOffer(item.previewURL)'>
          <div class='item'>
            <div class='name'>
              {{ item.name.length > 1 ? item.name : '(No name)' }}
            </div>
            <div class='job-title'>
              {{ item.jobTitle.length > 1 ? item.jobTitle : '(No title)' }}
            </div>
            <div class='actions'>
              <i class="fas fa-minus-circle" @click.stop='deleteItem(item.id)'></i>
            </div>
          </div>
        </div>
      </transition-group>
      <div class='more' v-if='more'>
        <button class='text small fullwidth standalone'>
          View all&nbsp;
          <i class="fas fa-caret-right"></i>
        </button>
      </div>
    </div>
    <div class='empty' v-if='items.length === 0'>
      <div class='card-content'>
        <div class='no-items'>
          Nothing yet.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendGetRequest, sendDeleteRequest } from "../utils";
export default {
  name: "SavedOfferFeed",
  props: ["title", "url"],
  data() {
    return {
      items: [],
      more: false,
      loading: true
    };
  },
  methods: {
    goToOffer: function(previewURL) {
      return this.$router.push({
        path: "/dashboard/create/offer-letter",
        query: {
          id: previewURL
        }
      });
    },
    deleteItem: async function(id) {
      const deleted = await sendDeleteRequest(`offer-letter/${id}`);
      this.loading = false;
      if (deleted.status === 200) {
        let idx;
        this.items.forEach((item, i) => {
          if (item.id === id) {
            return this.items.splice(i, 1);
          }
        });
      }
    }
  },
  async mounted() {
    const items = await sendGetRequest(this.url);
    if (items.data.offers.length > 5) this.more = true;
    this.items = items.data.offers.slice(0, 5);
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
.activity-container {
  flex-basis: 48.5%;
  margin-right: 1em;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 600px) {
    flex-basis: 100%;
    margin-right: 0;
  }
  .card-content {
    padding: 0;
  }
}
.item-wrapper {
  height: 2.75rem;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    background: rgba($primary, 0.5);
  }
  .item {
    padding: 0.75rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    display: flex;
    border: 1px solid transparent;
    box-sizing: border-box;
    overflow: hidden;
  }
  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.name {
  width: 40%;
}
.job-title {
  width: 40%;
}
.actions {
  width: 20%;
  text-align: right;
  > i {
    color: $grey;
    &:hover {
      color: white;
    }
  }
}
.no-items {
  padding: 0.75rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.documents-leave-active {
  transition: height 0.4s cubic-bezier(0.6, 0, 0.9, 0.6),
    background-color 0.2s ease-in-out;
}
.documents-leave-to {
  background-color: $danger;
  &:hover {
    background-color: $danger;
  }
  height: 0;
}
</style>
