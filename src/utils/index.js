import axios from "axios";
import store from "../store";
import router from "../router";

export const sendGetRequest = resource => {
  return new Promise(async (res, rej) => {
    try {
      const response = await axios.get(process.env.VUE_APP_API_URL + resource, {
        headers: {
          Authentication: `Bearer ${store.getters.token}`
        }
      });
      if (![200, 304].includes(response.status))
        throw new Error("Bad response!");
      if (response.data.user) {
        store.commit("setUser", response.data.user);
      }
      res(response);
    } catch (err) {
      router.push({
        path: "/login",
        query: {
          redirect: window.location.href
        }
      });
      res(err);
    }
  });
};

export const sendPostRequest = (resource, payload) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await axios.post(
        process.env.VUE_APP_API_URL + resource,
        payload,
        {
          headers: {
            Authentication: `Bearer ${store.getters.token}`
          }
        }
      );
      if (![200, 304].includes(response.status))
        throw new Error("Bad response!");
      if (response.data.user) {
        store.commit("setUser", response.data.user);
      }
      res(response);
    } catch (err) {
      router.push({
        path: "/login",
        query: {
          redirect: window.location.href
        }
      });
      res(err);
    }
  });
};

export const states = new Array(
  { name: "Alabama", abbrev: "AL" },
  { name: "Alaska", abbrev: "AK" },
  { name: "Arizona", abbrev: "AZ" },
  { name: "Arkansas", abbrev: "AR" },
  { name: "California", abbrev: "CA" },
  { name: "Colorado", abbrev: "CO" },
  { name: "Connecticut", abbrev: "CT" },
  { name: "Delaware", abbrev: "DE" },
  { name: "District of Columbia", abbrev: "DC" },
  { name: "Florida", abbrev: "FL" },
  { name: "Georgia", abbrev: "GA" },
  { name: "Hawaii", abbrev: "HI" },
  { name: "Idaho", abbrev: "ID" },
  { name: "Illinois", abbrev: "IL" },
  { name: "Indiana", abbrev: "IN" },
  { name: "Iowa", abbrev: "IA" },
  { name: "Kansas", abbrev: "KS" },
  { name: "Kentucky", abbrev: "KY" },
  { name: "Louisiana", abbrev: "LA" },
  { name: "Maine", abbrev: "ME" },
  { name: "Maryland", abbrev: "MD" },
  { name: "Massachusetts", abbrev: "MA" },
  { name: "Michigan", abbrev: "MI" },
  { name: "Minnesota", abbrev: "MN" },
  { name: "Mississippi", abbrev: "MS" },
  { name: "Missouri", abbrev: "MO" },
  { name: "Montana", abbrev: "MT" },
  { name: "Nebraska", abbrev: "NE" },
  { name: "Nevada", abbrev: "NV" },
  { name: "New Hampshire", abbrev: "NH" },
  { name: "New Jersey", abbrev: "NJ" },
  { name: "New Mexico", abbrev: "NM" },
  { name: "New York", abbrev: "NY" },
  { name: "North Carolina", abbrev: "NC" },
  { name: "North Dakota", abbrev: "ND" },
  { name: "Ohio", abbrev: "OH" },
  { name: "Oklahoma", abbrev: "OK" },
  { name: "Oregon", abbrev: "OR" },
  { name: "Pennsylvania", abbrev: "PA" },
  { name: "Rhode Island", abbrev: "RI" },
  { name: "South Carolina", abbrev: "SC" },
  { name: "South Dakota", abbrev: "SD" },
  { name: "Tennessee", abbrev: "TN" },
  { name: "Texas", abbrev: "TX" },
  { name: "Utah", abbrev: "UT" },
  { name: "Vermont", abbrev: "VT" },
  { name: "Virginia", abbrev: "VA" },
  { name: "Washington", abbrev: "WA" },
  { name: "West Virginia", abbrev: "WV" },
  { name: "Wisconsin", abbrev: "WI" },
  { name: "Wyoming", abbrev: "WY" }
);

export const getPrefillDate = daysFromNow => {
  let now = new Date();
  now.setDate(now.getDate() + daysFromNow);
  return [
    now.getFullYear(),
    (now.getMonth() + 1).toString().padStart(2, "0"),
    now
      .getDate()
      .toString()
      .padStart(2, "0")
  ].join("-");
};
