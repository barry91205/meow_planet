import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import "./assets/styles/main.scss"; // SCSS

import "material-design-icons-iconfont/dist/material-design-icons.css";

// 套件引入
// sweetalert套件
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// 引入 VeeValidate 元件跟功能
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
// 引入 VeeValidate 的驗證規則
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from "@vee-validate/i18n";
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

// createApp(App).use(router).mount("#app");
const app = createApp(App);
const pinia = createPinia();

// app.config.globalProperties.$axios = axios;
app.config.globalProperties.$Swal = Swal;

// import { defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);

// 自訂 phone 規則
defineRule("phone", (value) => {
  if (!value) return "電話為必填";

  const regex = /^09\d{8}$/;
  return regex.test(value) || "請輸入正確的手機號碼";
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.use(pinia);
app.use(router);
app.mount("#app");
