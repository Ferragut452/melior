import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import api from "./api.js";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;

Vue.prototype.api = api;

Vue.use(VeeValidate);

new Vue({
  store,
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
