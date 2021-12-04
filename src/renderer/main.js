import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/style.css";
import "@/mixins/index.js";

Vue.use(ElementUI);

import VueMask from "v-mask";
Vue.use(VueMask);

import App from "./App";
import router from "./router";
import store from "./store";

import VueSocketIO from "vue-socket.io";
// import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client";

/* Establish Connection */
// const socketConnection = SocketIO("ws://localhost:80");
//
// Vue.use(
//     new VueSocketIO({
//         debug: true,
//         connection: socketConnection,
//     })
// );

// Vue.use(
//     new VueSocketIO({
//         debug: true,
//         connection: "http://localhost",
//     })
// );

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
import api from "./mixins/api";
Vue.config.productionTip = false;
Vue.prototype.$axios = api;
api.defaults.timeout = 10000;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: "<App/>",
}).$mount("#app");