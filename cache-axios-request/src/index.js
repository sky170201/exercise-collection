import Vue from "vue";
import App from "./App.vue";
import "./style/index.scss";

console.log(1231, process.env.NODE_ENV);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
