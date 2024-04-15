import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import * as Pinia from "pinia";

const pinia = createPinia();

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);

  return {
    app,
    Pinia,
  };
}
